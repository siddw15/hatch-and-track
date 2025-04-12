
import React, { useState } from 'react';
import { useProjects } from '@/context/ProjectContext';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectStatusFilter from '@/components/projects/ProjectStatusFilter';
import { ProjectStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { projects, isLoading } = useProjects();
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');

  const filteredProjects = statusFilter === 'all'
    ? projects
    : projects.filter(project => project.status === statusFilter);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Manage and track all your projects</p>
        </div>
        
        <Button asChild>
          <Link to="/projects/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Project
          </Link>
        </Button>
      </div>
      
      <ProjectStatusFilter 
        activeStatus={statusFilter} 
        onFilterChange={setStatusFilter} 
      />
      
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground mb-4">No projects found</p>
          {statusFilter !== 'all' ? (
            <Button variant="outline" onClick={() => setStatusFilter('all')}>
              View All Projects
            </Button>
          ) : (
            <Button asChild>
              <Link to="/projects/new">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Your First Project
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
