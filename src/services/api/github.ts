import { Octokit } from '@octokit/rest';
import { ApiService, RepoContent } from '@/types/api';
import { Repository } from '@/types/repository';

export class GithubApiService implements ApiService {
  private octokit: Octokit;

  constructor(token?: string) {
    this.octokit = new Octokit({
      auth: token || process.env.NEXT_PUBLIC_GITHUB_TOKEN,
    });
  }

  async getRepositories(username: string): Promise<Repository[]> {
    try {
      const response = await this.octokit.repos.listForUser({
        username,
        sort: 'updated',
        per_page: 100,
      });

      return response.data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage || null,
        stargazers_count: repo.stargazers_count || 0,
        language: repo.language || null,
        updated_at: repo.updated_at || '',
        topics: repo.topics || [],
        default_branch: repo.default_branch || 'main',
      }));
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw error;
    }
  }

  async getReadme(owner: string, repo: string): Promise<string> {
    try {
      const response = await this.octokit.repos.getReadme({
        owner,
        repo,
      });

      // Decode base64 content
      const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
      return content;
    } catch (error) {
      console.error('Error fetching README:', error);
      return 'No README available';
    }
  }

  async getRepoContent(owner: string, repo: string, path: string = ''): Promise<RepoContent[] | RepoContent> {
    try {
      // Sanitize path to prevent directory traversal
      const sanitizedPath = path.replace(/\.\./g, '').replace(/^\/+/, '');
      
      const response = await this.octokit.repos.getContent({
        owner,
        repo,
        path: sanitizedPath,
      });

      // Validate response structure
      const data = response.data;
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid API response structure');
      }

      return data as RepoContent[] | RepoContent;
    } catch (error) {
      console.error('Error fetching repository content:', error);
      throw error;
    }
  }
}
