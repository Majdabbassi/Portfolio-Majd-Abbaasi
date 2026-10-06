export type ProjectStatus = 'production' | 'completed' | 'in-development' | 'flagship';

export interface Showcase {
  /** Live demo, or undefined when there is none. */
  live?: string;
  /** Source code on GitHub. */
  repo?: string;
  /** The repository is private: shown as "available on request". */
  repoPrivate?: boolean;
  /** Demo accounts a visitor can sign in with. */
  logins?: { role: string; user: string; password: string }[];
  /** More buttons (a second app, a guest page...). */
  extra?: { label: string; href: string }[];
  /** One line under the buttons (free hosting sleeps, demo data...). */
  note?: string;
  /** The first screenshot is the hero image. */
  screens: { src: string; caption: string }[];
}

export interface DiagramTier {
  label?: string;
  nodes: { name: string; sub?: string }[];
}

export interface ProjectDetail {
  id: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  role: string;
  roleContext: string;
  techStack: string[];
  metrics: { team: string; duration: string; scale: string; keyOutcomes: string[] };
  context: { problem: string; constraints: string[]; goals: string[] };
  architecture: {
    diagramPlaceholder: string;
    bullets: string[];
    highlights: { title: string; description: string }[];
    tiers?: DiagramTier[];
    note?: string;
  };
  decisions: { title: string; reasoning: string; tradeoffs: string }[];
  deployment: {
    isDeployed: boolean;
    liveUrl?: string;
    apkUrl?: string;
    flow?: string;
    environment?: string;
    details: string[];
    considerations?: string[];
  };
  challenges: { challenge: string; solution: string; outcome: string }[];
  impact: { improvements: string[]; learnings: string[] };
  mobile?: { platform: string; storeStatus: string; build: string; details: string[] };
  showcase?: Showcase;
}
