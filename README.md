# Project Dashboard

A modern React Next.js dashboard that displays all GitHub projects from a configured user using the latest GitHub API.

## Features

- 📊 **Dashboard View**: Grid of project tiles with key information
  - Project name and description
  - Programming language with visual indicator
  - Star count
  - Topics/tags (up to 3 displayed)
  - Responsive grid layout (1-3 columns based on screen size)

- 📖 **Project Details Modal**: Click any tile to view detailed information
  - **README Tab**: Full README content with markdown rendering
  - **Code Tab**: Direct link to GitHub repository
  - Responsive modal with smooth animations

- 🎨 **Render View**: VS Code-like interface for project exploration
  - **File Explorer Panel**: Browse repository structure
  - **Code Editor Panel**: View file contents with syntax highlighting
  - **Preview Panel**: Project information and GitHub link
  - "Back to Dashboard" navigation

- 🔄 **API Abstraction**: Isolated API layer to easily switch between GitHub/GitLab
  - Provider-agnostic interface
  - Easy to extend with new providers
  - Centralized error handling

- 🎨 **Modern UI**: Built with Tailwind CSS and dark mode support
  - Fully responsive design
  - Dark mode compatible
  - Smooth transitions and hover effects

- ⚡ **Fast**: Built with Next.js 16 and React 19
  - Turbopack for ultra-fast builds
  - Optimized bundle size
  - Server-side rendering support

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Octokit** (GitHub API)
- **React Markdown**

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tdouillard/project-dashboard.git
cd project-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and set your GitHub username:
```
NEXT_PUBLIC_GITHUB_USERNAME=your_github_username
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_optional
```

Note: GitHub token is optional but recommended for higher rate limits. Generate one at: https://github.com/settings/tokens

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo with Mock Data

To see all features without requiring GitHub API access, visit the demo page:

```bash
npm run dev
# Visit http://localhost:3000/demo
```

The demo page showcases:
- Project tiles with various languages and topics
- Project detail modal with README rendering
- Code view tab
- Navigation to render view

## Project Structure

```
src/
├── app/                      # Next.js app router pages
│   ├── page.tsx             # Main dashboard
│   └── render/[owner]/[repo]/ # Project render view
├── components/              # React components
│   ├── ProjectTile.tsx     # Project card component
│   └── ProjectModal.tsx    # Project detail modal
├── services/               # API services
│   └── api/
│       ├── github.ts       # GitHub API implementation
│       └── index.ts        # API factory
├── types/                  # TypeScript types
│   ├── repository.ts       # Repository types
│   └── api.ts             # API interface
└── lib/                    # Utilities
    └── config.ts           # Configuration
```

## API Abstraction

The project uses an abstraction layer to isolate API calls from the core application. This allows easy switching between different providers (GitHub, GitLab, etc.).

To add a new API provider:

1. Create a new service in `src/services/api/` implementing the `ApiService` interface
2. Update the factory in `src/services/api/index.ts`
3. Update the configuration in `src/lib/config.ts`

## Usage

### Dashboard
- Browse all projects in a grid layout
- Click on any project tile to view details

### Project Modal
- View the project README
- Access code information
- Click "Render Project" to open the render view

### Render View
- Browse project files in the left panel
- View file contents in the center panel
- See project preview/information in the right panel

## Building for Production

```bash
npm run build
npm start
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

MIT

