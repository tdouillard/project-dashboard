"use client";

import { useState } from "react";
import { Repository } from "@/types/repository";
import { useLanguage } from "@/hooks/useLanguage";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { useRouter } from "next/navigation";
import { FiGithub } from "react-icons/fi";
import "highlight.js/styles/github-dark.css";

interface ProjectModalProps {
  project: Repository | null;
  onClose: () => void;
  readme: string;
  isLoadingReadme: boolean;
}

export default function ProjectModal({
  project,
  onClose,
  readme,
  isLoadingReadme,
}: ProjectModalProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"readme">("readme");

  if (!project) return null;

  const handleRender = () => {
    const owner = project.full_name.split("/")[0];
    router.push(`/render/${owner}/${project.name}`);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-top">
            <div>
              <h2 className="modal-title">{project.name}</h2>
              {project.description && (
                <p className="modal-description">{project.description}</p>
              )}
            </div>
            <button onClick={onClose} className="modal-close-button">
              ×
            </button>
          </div>

          {/* Tabs */}
          <div className="modal-tabs">
            <button
              onClick={() => setActiveTab("readme")}
              className={`tab-button ${
                activeTab === "readme"
                  ? "tab-button-active"
                  : "tab-button-inactive"
              }`}
            >
              {t.readme}
            </button>
            <div className="modal-github-link-container">
              <span className="modal-github-url">{project.html_url}</span>
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-github-icon"
                title="View on GitHub"
              >
                <FiGithub />
              </a>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="modal-body">
          {activeTab === "readme" && (
            <div className="readme-content">
              {isLoadingReadme ? (
                <p>{t.loadingReadme}</p>
              ) : (
                <ReactMarkdown
                  rehypePlugins={[
                    rehypeRaw,
                    rehypeHighlight,
                    rehypeSlug,
                    [
                      rehypeAutolinkHeadings,
                      {
                        behavior: "wrap",
                      },
                    ],
                  ]}
                >
                  {readme}
                </ReactMarkdown>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="button-secondary">
            {t.close}
          </button>
          <button onClick={handleRender} className="button-primary">
            {t.renderProject}
          </button>
        </div>
      </div>
    </div>
  );
}
