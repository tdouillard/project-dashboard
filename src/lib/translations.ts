export const translations = {
  en: {
    // Page titles and headers
    pageTitle: "Project Dashboard",
    pageDescription: "Web dashboard listing all GitHub projects from a user",
    projectsBy: "Projects by",

    // Loading and empty states
    loadingProjects: "Loading projects...",
    noProjectsFound: "No projects found",
    loadingReadme: "Loading README...",

    // Modal actions and labels
    readme: "README",
    code: "Code",
    viewCodeOnGithub: "View code on GitHub:",
    close: "Close",
    renderProject: "Render Project",
    noReadmeAvailable: "No README available",

    // Errors
    errorFetchingProjects: "Error fetching projects:",
    errorFetchingReadme: "Error fetching README:",
  },
  fr: {
    // Page titles and headers
    pageTitle: "Tableau de Bord des Projets",
    pageDescription:
      "Tableau de bord web listant tous les projets GitHub d'un utilisateur",
    projectsBy: "Projets de",

    // Loading and empty states
    loadingProjects: "Chargement des projets...",
    noProjectsFound: "Aucun projet trouvé",
    loadingReadme: "Chargement du README...",

    // Modal actions and labels
    readme: "README",
    code: "Code",
    viewCodeOnGithub: "Voir le code sur GitHub:",
    close: "Fermer",
    renderProject: "Afficher le Projet",
    noReadmeAvailable: "Pas de README disponible",

    // Errors
    errorFetchingProjects: "Erreur lors du chargement des projets:",
    errorFetchingReadme: "Erreur lors du chargement du README:",
  },
  es: {
    // Page titles and headers
    pageTitle: "Panel de Proyectos",
    pageDescription:
      "Panel web que lista todos los proyectos de GitHub de un usuario",
    projectsBy: "Proyectos de",

    // Loading and empty states
    loadingProjects: "Cargando proyectos...",
    noProjectsFound: "No se encontraron proyectos",
    loadingReadme: "Cargando README...",

    // Modal actions and labels
    readme: "README",
    code: "Código",
    viewCodeOnGithub: "Ver código en GitHub:",
    close: "Cerrar",
    renderProject: "Mostrar Proyecto",
    noReadmeAvailable: "No hay README disponible",

    // Errors
    errorFetchingProjects: "Error al cargar proyectos:",
    errorFetchingReadme: "Error al cargar README:",
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKeys = keyof (typeof translations)["en"];

export const getTranslations = (language: Language) => {
  return translations[language] || translations.en;
};
