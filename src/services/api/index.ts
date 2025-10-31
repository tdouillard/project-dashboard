import { ApiService } from '@/types/api';
import { GithubApiService } from './github';

// Factory function to get the appropriate API service
export function getApiService(provider: 'github' = 'github'): ApiService {
  switch (provider) {
    case 'github':
      return new GithubApiService();
    default:
      return new GithubApiService();
  }
}

export { GithubApiService };
