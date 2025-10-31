'use client';

import { useState } from 'react';
import { Repository } from '@/types/repository';
import ProjectTile from '@/components/ProjectTile';
import ProjectModal from '@/components/ProjectModal';

// Mock data for demonstration
const mockProjects: Repository[] = [
  {
    id: 1,
    name: 'project-dashboard',
    full_name: 'tdouillard/project-dashboard',
    description: 'Web dashboard listing all GitHub projects from a user',
    html_url: 'https://github.com/tdouillard/project-dashboard',
    homepage: 'https://project-dashboard.vercel.app',
    stargazers_count: 42,
    language: 'TypeScript',
    updated_at: '2024-10-31T14:00:00Z',
    topics: ['react', 'nextjs', 'typescript', 'dashboard'],
    default_branch: 'main',
  },
  {
    id: 2,
    name: 'awesome-library',
    full_name: 'tdouillard/awesome-library',
    description: 'A collection of awesome tools and utilities',
    html_url: 'https://github.com/tdouillard/awesome-library',
    homepage: null,
    stargazers_count: 128,
    language: 'JavaScript',
    updated_at: '2024-10-30T10:00:00Z',
    topics: ['javascript', 'utilities', 'tools'],
    default_branch: 'main',
  },
  {
    id: 3,
    name: 'ml-experiments',
    full_name: 'tdouillard/ml-experiments',
    description: 'Machine learning experiments and notebooks',
    html_url: 'https://github.com/tdouillard/ml-experiments',
    homepage: null,
    stargazers_count: 89,
    language: 'Python',
    updated_at: '2024-10-29T15:30:00Z',
    topics: ['machine-learning', 'python', 'jupyter'],
    default_branch: 'main',
  },
  {
    id: 4,
    name: 'api-gateway',
    full_name: 'tdouillard/api-gateway',
    description: 'Microservices API gateway with authentication',
    html_url: 'https://github.com/tdouillard/api-gateway',
    homepage: 'https://api.example.com',
    stargazers_count: 256,
    language: 'Go',
    updated_at: '2024-10-28T09:00:00Z',
    topics: ['golang', 'microservices', 'api', 'gateway'],
    default_branch: 'main',
  },
  {
    id: 5,
    name: 'design-system',
    full_name: 'tdouillard/design-system',
    description: 'Component library and design tokens',
    html_url: 'https://github.com/tdouillard/design-system',
    homepage: 'https://storybook.example.com',
    stargazers_count: 73,
    language: 'TypeScript',
    updated_at: '2024-10-27T12:00:00Z',
    topics: ['design-system', 'react', 'storybook'],
    default_branch: 'main',
  },
  {
    id: 6,
    name: 'mobile-app',
    full_name: 'tdouillard/mobile-app',
    description: 'Cross-platform mobile application',
    html_url: 'https://github.com/tdouillard/mobile-app',
    homepage: null,
    stargazers_count: 167,
    language: 'Dart',
    updated_at: '2024-10-26T16:00:00Z',
    topics: ['flutter', 'mobile', 'cross-platform'],
    default_branch: 'main',
  },
];

const mockReadme = `# Project Dashboard

A modern React Next.js dashboard that displays all GitHub projects from a configured user.

## Features

- 📊 Dashboard view with project tiles
- 📖 Project details with README
- 🎨 VS Code-like render view
- 🔄 API abstraction layer

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Octokit (GitHub API)

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000)

## License

MIT
`;

export default function DemoPage() {
  const [selectedProject, setSelectedProject] = useState<Repository | null>(null);

  const handleProjectClick = (project: Repository) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Project Dashboard - Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Projects by tdouillard (Mock Data)
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <ProjectTile
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>
      </main>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
          readme={mockReadme}
          isLoadingReadme={false}
        />
      )}
    </div>
  );
}
