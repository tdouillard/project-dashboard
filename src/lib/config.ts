export const config = {
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'tdouillard',
  githubToken: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  apiProvider: 'github' as const,
};
