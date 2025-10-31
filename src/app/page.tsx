'use client';

import { useState, useEffect } from 'react';
import { Repository } from '@/types/repository';
import { getApiService } from '@/services/api';
import { config } from '@/lib/config';
import ProjectTile from '@/components/ProjectTile';
import ProjectModal from '@/components/ProjectModal';

export default function Home() {
  const [projects, setProjects] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Repository | null>(null);
  const [readme, setReadme] = useState('');
  const [isLoadingReadme, setIsLoadingReadme] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiService = getApiService(config.apiProvider);
        const repos = await apiService.getRepositories(config.githubUsername);
        setProjects(repos);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = async (project: Repository) => {
    setSelectedProject(project);
    setIsLoadingReadme(true);
    
    try {
      const apiService = getApiService(config.apiProvider);
      const owner = project.full_name.split('/')[0];
      const readmeContent = await apiService.getReadme(owner, project.name);
      setReadme(readmeContent);
    } catch (error) {
      console.error('Error fetching README:', error);
      setReadme('No README available');
    } finally {
      setIsLoadingReadme(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setReadme('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Project Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Projects by {config.githubUsername}
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-600 dark:text-gray-400">
              Loading projects...
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-600 dark:text-gray-400">
              No projects found
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectTile
                key={project.id}
                project={project}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </div>
        )}
      </main>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
          readme={readme}
          isLoadingReadme={isLoadingReadme}
        />
      )}
    </div>
  );
}
