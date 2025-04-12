
import React from 'react';
import { Layout, CheckSquare, Calendar, Tag, Github, Rocket, BarChart } from 'lucide-react';

const features = [
  {
    title: 'Project Dashboard',
    description: 'Get a bird\'s-eye view of all your projects and their current status.',
    icon: <Layout className="h-8 w-8 text-purple-500" />,
  },
  {
    title: 'Task Management',
    description: 'Create and manage task checklists for each project with deadlines.',
    icon: <CheckSquare className="h-8 w-8 text-purple-500" />,
  },
  {
    title: 'Tech Stack Tagging',
    description: 'Track technologies used across projects with an intuitive tagging system.',
    icon: <Tag className="h-8 w-8 text-purple-500" />,
  },
  {
    title: 'Calendar View',
    description: 'Plan your work with a monthly calendar view showing all project deadlines.',
    icon: <Calendar className="h-8 w-8 text-purple-500" />,
  },
  {
    title: 'GitHub Integration',
    description: 'Link your GitHub repositories for quick access to your codebase.',
    icon: <Github className="h-8 w-8 text-purple-500" />,
  },
  {
    title: 'Deployment Tracking',
    description: 'Store and access your deployment links for easy reference.',
    icon: <Rocket className="h-8 w-8 text-purple-500" />,
  },
];

const Features: React.FC = () => {
  return (
    <div id="features" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Features</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Everything you need to track and manage your projects efficiently, without the complexity.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="glass-card p-6 rounded-lg animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
