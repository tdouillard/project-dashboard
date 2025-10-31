# Development Guide

## Project Overview

This is a Next.js-based project dashboard that displays GitHub repositories for a configured user.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_GITHUB_USERNAME=your_username
NEXT_PUBLIC_GITHUB_TOKEN=your_token_optional
```

## Project Structure

- `/src/app/` - Next.js App Router pages
- `/src/components/` - Reusable React components
- `/src/services/api/` - API abstraction layer
- `/src/types/` - TypeScript type definitions
- `/src/lib/` - Utilities and configuration

## Adding a New API Provider

1. Create a new service in `/src/services/api/` implementing `ApiService`
2. Update the factory in `/src/services/api/index.ts`
3. Update config in `/src/lib/config.ts`

Example:

```typescript
// src/services/api/gitlab.ts
import { ApiService } from '@/types/api';

export class GitlabApiService implements ApiService {
  async getRepositories(username: string) {
    // Implementation
  }
  
  async getReadme(owner: string, repo: string) {
    // Implementation
  }
  
  async getRepoContent(owner: string, repo: string, path?: string) {
    // Implementation
  }
}

// src/services/api/index.ts
export function getApiService(provider: 'github' | 'gitlab' = 'github') {
  switch (provider) {
    case 'gitlab':
      return new GitlabApiService();
    case 'github':
    default:
      return new GithubApiService();
  }
}
```

## Testing

### Demo Mode
Visit `/demo` to test the UI with mock data without needing API access.

### Manual Testing
1. Start dev server: `npm run dev`
2. Visit `http://localhost:3000`
3. Check dashboard loads
4. Click a project tile
5. Test README and Code tabs
6. Click "Render Project"
7. Verify file explorer and preview

## Common Issues

### GitHub API Rate Limiting
If you hit rate limits, add a GitHub token to `.env.local`:
```
NEXT_PUBLIC_GITHUB_TOKEN=ghp_yourtoken
```

### Build Errors
1. Clear `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Rebuild: `npm run build`

## Code Style

- Use TypeScript for all new files
- Follow existing component patterns
- Use Tailwind CSS for styling
- Keep components small and focused
- Add JSDoc comments for complex functions

## Security Best Practices

- Never commit `.env.local` or secrets
- Sanitize user inputs
- Validate API responses
- Use TypeScript for type safety
- Run security checks: `npm audit`
