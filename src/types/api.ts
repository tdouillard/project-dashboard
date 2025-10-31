import { Repository } from './repository';

export interface ApiService {
  getRepositories(username: string): Promise<Repository[]>;
  getReadme(owner: string, repo: string): Promise<string>;
  getRepoContent(owner: string, repo: string, path?: string): Promise<RepoContent[] | RepoContent>;
}

export interface RepoContent {
  name: string;
  path: string;
  type: string;
  sha?: string;
  content?: string;
  encoding?: string;
}
