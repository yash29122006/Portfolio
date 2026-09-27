export interface Project {
  id: number;
  name: string;
  techStack: string;
  description: string;
  githubLink: string | null;
  liveLink: string | null;
  featured: boolean;
}