
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Task, ProjectStatus } from '@/types';
import { mockProjects } from '@/data/mockProjects';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';

interface ProjectContextType {
  projects: Project[];
  getProjectById: (id: string) => Project | undefined;
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addTask: (projectId: string, task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (projectId: string, taskId: string, updates: Partial<Task>) => void;
  toggleTaskStatus: (projectId: string, taskId: string) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  getProjectsByStatus: (status: ProjectStatus) => Project[];
  isLoading: boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading from a database
    const loadProjects = () => {
      setIsLoading(true);
      setTimeout(() => {
        setProjects(mockProjects);
        setIsLoading(false);
      }, 1000);
    };

    loadProjects();
  }, []);

  const getProjectById = (id: string): Project | undefined => {
    return projects.find(project => project.id === id);
  };

  const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): string => {
    const now = new Date().toISOString();
    const newProject: Project = {
      ...project,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };

    setProjects(prevProjects => [...prevProjects, newProject]);
    toast({
      title: "Project created",
      description: `${newProject.title} has been created successfully.`,
    });
    return newProject.id;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === id
          ? { ...project, ...updates, updatedAt: new Date().toISOString() }
          : project
      )
    );
    toast({
      title: "Project updated",
      description: "Your changes have been saved.",
    });
  };

  const deleteProject = (id: string) => {
    const projectToDelete = getProjectById(id);
    setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
    if (projectToDelete) {
      toast({
        title: "Project deleted",
        description: `${projectToDelete.title} has been deleted.`,
      });
    }
  };

  const addTask = (projectId: string, task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };

    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId
          ? {
              ...project,
              tasks: [...project.tasks, newTask],
              updatedAt: new Date().toISOString(),
            }
          : project
      )
    );
    toast({
      title: "Task added",
      description: "A new task has been added to your project.",
    });
  };

  const updateTask = (projectId: string, taskId: string, updates: Partial<Task>) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map(task =>
                task.id === taskId ? { ...task, ...updates } : task
              ),
              updatedAt: new Date().toISOString(),
            }
          : project
      )
    );
  };

  const toggleTaskStatus = (projectId: string, taskId: string) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
              updatedAt: new Date().toISOString(),
            }
          : project
      )
    );
  };

  const deleteTask = (projectId: string, taskId: string) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId
          ? {
              ...project,
              tasks: project.tasks.filter(task => task.id !== taskId),
              updatedAt: new Date().toISOString(),
            }
          : project
      )
    );
    toast({
      title: "Task deleted",
      description: "The task has been removed from your project.",
    });
  };

  const getProjectsByStatus = (status: ProjectStatus): Project[] => {
    return projects.filter(project => project.status === status);
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        getProjectById,
        addProject,
        updateProject,
        deleteProject,
        addTask,
        updateTask,
        toggleTaskStatus,
        deleteTask,
        getProjectsByStatus,
        isLoading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
