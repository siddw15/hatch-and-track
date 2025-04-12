
export type ProjectStatus = 'planned' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  techStack: string[];
  githubUrl?: string;
  deploymentUrl?: string;
  tasks: Task[];
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}
