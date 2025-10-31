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
    <div className="page-container">
      <header className="page-header">
        <div className="header-content">
          <h1 className="header-title">
            Project Dashboard
          </h1>
          <p className="header-subtitle">
            Projects by {config.githubUsername}
          </p>
        </div>
      </header>

      <main className="main-content">
        {loading ? (
          <div className="loading-container">
            <div className="loading-text">
              Loading projects...
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state-container">
            <div className="empty-state-text">
              No projects found
            </div>
          </div>
        ) : (
          <div className="grid-container">
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
