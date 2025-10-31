'use client';

import { useState } from 'react';
import { Repository } from '@/types/repository';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/navigation';

interface ProjectModalProps {
  project: Repository | null;
  onClose: () => void;
  readme: string;
  isLoadingReadme: boolean;
}

export default function ProjectModal({ project, onClose, readme, isLoadingReadme }: ProjectModalProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'readme' | 'code'>('readme');

  if (!project) return null;

  const handleRender = () => {
    const owner = project.full_name.split('/')[0];
    router.push(`/render/${owner}/${project.name}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {project.name}
              </h2>
              {project.description && (
                <p className="text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setActiveTab('readme')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'readme'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              README
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'code'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Code
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'readme' && (
            <div className="prose dark:prose-invert max-w-none">
              {isLoadingReadme ? (
                <p>Loading README...</p>
              ) : (
                <ReactMarkdown>{readme}</ReactMarkdown>
              )}
            </div>
          )}
          
          {activeTab === 'code' && (
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                View code on GitHub:
              </p>
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 underline"
              >
                {project.html_url}
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleRender}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Render Project
          </button>
        </div>
      </div>
    </div>
  );
}
