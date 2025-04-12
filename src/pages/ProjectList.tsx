
import React, { useState } from 'react';
import { useProjects } from '@/context/ProjectContext';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectStatusFilter from '@/components/projects/ProjectStatusFilter';
import { ProjectStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const ProjectList: React.FC = () => {
  const { projects, isLoading } = useProjects();
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects
    .filter(project => 
      statusFilter === 'all' || project.status === statusFilter
    )
    .filter(project => 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some(tech => 
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

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
          <h1 className="text-3xl font-bold mb-1">Projects</h1>
          <p className="text-muted-foreground">Browse and manage all your projects</p>
        </div>
        
        <Button asChild>
          <Link to="/projects/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Project
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:flex-1">
          <ProjectStatusFilter 
            activeStatus={statusFilter} 
            onFilterChange={setStatusFilter} 
          />
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10 w-full md:w-60"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground mb-4">No projects found</p>
          {searchQuery || statusFilter !== 'all' ? (
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
            }}>
              Clear Filters
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

export default ProjectList;
