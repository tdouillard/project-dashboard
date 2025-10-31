'use client';

import { Repository } from '@/types/repository';

interface ProjectTileProps {
  project: Repository;
  onClick: () => void;
}

export default function ProjectTile({ project, onClick }: ProjectTileProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer p-6 border border-gray-200 dark:border-gray-700"
    >
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
        {project.name}
      </h3>
      
      {project.description && (
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-2">
          {project.description}
        </p>
      )}
      
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        {project.language && (
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            {project.language}
          </span>
        )}
        
        <span className="flex items-center gap-1">
          ⭐ {project.stargazers_count}
        </span>
      </div>
      
      {project.topics && project.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {project.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
