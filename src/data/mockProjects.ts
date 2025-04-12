
import { Project, ProjectStatus } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const generateId = () => uuidv4();
const today = new Date().toISOString();

export const mockProjects: Project[] = [
  {
    id: generateId(),
    title: 'E-commerce Dashboard',
    description: 'A responsive dashboard for e-commerce stores with real-time sales analytics and inventory management.',
    status: 'in-progress',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Chart.js'],
    githubUrl: 'https://github.com/username/ecommerce-dashboard',
    deploymentUrl: 'https://ecommerce-dashboard.vercel.app',
    tasks: [
      {
        id: generateId(),
        title: 'Set up project repository',
        completed: true,
        createdAt: today,
      },
      {
        id: generateId(),
        title: 'Create layout components',
        completed: true,
        createdAt: today,
      },
      {
        id: generateId(),
        title: 'Implement analytics charts',
        completed: false,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: today,
      },
      {
        id: generateId(),
        title: 'Connect to Supabase database',
        completed: false,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: today,
      }
    ],
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: today,
    updatedAt: today,
  },
  {
    id: generateId(),
    title: 'AI-Powered Content Generator',
    description: 'A tool that uses GPT-4 to generate blog posts, social media content, and marketing copy.',
    status: 'planned',
    techStack: ['Next.js', 'OpenAI API', 'Node.js', 'MongoDB', 'Express'],
    tasks: [
      {
        id: generateId(),
        title: 'Research OpenAI API documentation',
        completed: true,
        createdAt: today,
      },
      {
        id: generateId(),
        title: 'Design system architecture',
        completed: false,
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: today,
      },
      {
        id: generateId(),
        title: 'Create user interface mockups',
        completed: false,
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        createdAt: today,
      }
    ],
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: today,
    updatedAt: today,
  },
  {
    id: generateId(),
    title: 'Mobile Fitness App',
    description: 'A cross-platform app for tracking workouts, nutrition, and progress with social features.',
    status: 'completed',
    techStack: ['React Native', 'Firebase', 'Redux', 'Expo', 'TypeScript'],
    githubUrl: 'https://github.com/username/fitness-tracker',
    deploymentUrl: 'https://play.google.com/store/apps/details?id=com.fitnesstracker',
    tasks: [
      {
        id: generateId(),
        title: 'Create app wireframes',
        completed: true,
        createdAt: today,
      },
      {
        id: generateId(),
        title: 'Set up Firebase authentication',
        completed: true,
        createdAt: today,
      },
      {
        id: generateId(),
        title: 'Implement workout tracking features',
        completed: true,
        createdAt: today,
      },
      {
        id: generateId(),
        title: 'Add social sharing capabilities',
        completed: true,
        createdAt: today,
      },
      {
        id: generateId(),
        title: 'Publish to app stores',
        completed: true,
        createdAt: today,
      }
    ],
    startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: today,
    updatedAt: today,
  },
  {
    id: generateId(),
    title: 'Personal Portfolio Website',
    description: 'A modern portfolio site showcasing my projects, skills, and contact information.',
    status: 'on-hold',
    techStack: ['Next.js', 'Three.js', 'GSAP', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/username/portfolio',
    tasks: [
      {
        id: generateId(),
        title: 'Design website layout',
        completed: true,
        createdAt: today,
      },
      {
        id: generateId(),
        title: 'Implement 3D animations with Three.js',
        completed: false,
        createdAt: today,
      },
      {
        id: generateId(),
        title: 'Optimize for mobile devices',
        completed: false,
        createdAt: today,
      }
    ],
    startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: today,
    updatedAt: today,
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return mockProjects.find(project => project.id === id);
};

export const getAllProjects = (): Project[] => {
  return [...mockProjects];
};

export const getProjectsByStatus = (status: ProjectStatus): Project[] => {
  return mockProjects.filter(project => project.status === status);
};
