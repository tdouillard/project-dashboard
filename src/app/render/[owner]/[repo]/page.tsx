'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getApiService } from '@/services/api';
import { config } from '@/lib/config';

import { RepoContent } from '@/types/api';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'dir';
  sha?: string;
}

export default function RenderPage() {
  const params = useParams();
  const owner = params.owner as string;
  const repo = params.repo as string;
  
  const [files, setFiles] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepoContent = async () => {
      try {
        const apiService = getApiService(config.apiProvider);
        const content = await apiService.getRepoContent(owner, repo);
        
        if (Array.isArray(content)) {
          const fileNodes: FileNode[] = content.map((item: RepoContent) => ({
            name: item.name,
            path: item.path,
            type: item.type === 'dir' ? 'dir' : 'file',
            sha: item.sha,
          }));
          setFiles(fileNodes);
        }
      } catch (error) {
        console.error('Error fetching repository content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoContent();
  }, [owner, repo]);

  const handleFileClick = async (file: FileNode) => {
    if (file.type === 'dir') return;
    
    setSelectedFile(file.path);
    try {
      const apiService = getApiService(config.apiProvider);
      const content = await apiService.getRepoContent(owner, repo, file.path);
      
      if (!Array.isArray(content) && content.content) {
        const decoded = Buffer.from(content.content, 'base64').toString('utf-8');
        setFileContent(decoded);
      }
    } catch (error) {
      console.error('Error fetching file content:', error);
      setFileContent('Error loading file content');
    }
  };

  const projectUrl = `https://github.com/${owner}/${repo}`;

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Dashboard
          </Link>
          <h1 className="text-xl font-semibold">
            {owner}/{repo}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer Panel */}
        <div className="w-64 bg-gray-800 text-white overflow-auto border-r border-gray-700">
          <div className="p-4">
            <h2 className="text-sm font-semibold text-gray-400 mb-2">FILES</h2>
            {loading ? (
              <p className="text-gray-400 text-sm">Loading...</p>
            ) : (
              <div className="space-y-1">
                {files.map((file) => (
                  <button
                    key={file.path}
                    onClick={() => handleFileClick(file)}
                    className={`w-full text-left px-2 py-1 rounded text-sm hover:bg-gray-700 transition-colors ${
                      selectedFile === file.path ? 'bg-gray-700' : ''
                    }`}
                  >
                    {file.type === 'dir' ? '📁' : '📄'} {file.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Code Editor Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 bg-gray-900 text-gray-100 overflow-auto">
            {selectedFile ? (
              <div className="p-4">
                <div className="text-xs text-gray-400 mb-2">{selectedFile}</div>
                <pre className="text-sm font-mono bg-gray-800 p-4 rounded overflow-x-auto">
                  <code>{fileContent || 'Loading...'}</code>
                </pre>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                Select a file to view its content
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        <div className="w-1/2 bg-white border-l border-gray-700 flex flex-col">
          <div className="bg-gray-800 text-white px-4 py-2 text-sm">
            Preview
          </div>
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Project Preview
              </h3>
              <p className="text-gray-600 mb-6">
                To run this project locally, clone it and follow the instructions in the README.
              </p>
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Open on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
