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
      className="project-tile"
    >
      <h3 className="project-tile-title">
        {project.name}
      </h3>
      
      {project.description && (
        <p className="project-tile-description">
          {project.description}
        </p>
      )}
      
      <div className="project-tile-meta">
        {project.language && (
          <span className="language-badge">
            <span className="language-dot"></span>
            {project.language}
          </span>
        )}
        
        <span className="stars-badge">
          ⭐ {project.stargazers_count}
        </span>
      </div>
      
      {project.topics && project.topics.length > 0 && (
        <div className="topics-container">
          {project.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="topic-badge"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
