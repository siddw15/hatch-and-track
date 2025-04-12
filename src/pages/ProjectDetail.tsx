
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '@/context/ProjectContext';
import { Loader2, ArrowLeft, ExternalLink, Github, Calendar, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectStatus } from '@/types';
import TaskList from '@/components/projects/TaskList';
import TechBadge from '@/components/projects/TechBadge';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProjectById, updateProject, deleteProject, isLoading } = useProjects();
  const project = getProjectById(id || '');
  
  const [status, setStatus] = useState<ProjectStatus | ''>('');
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist or has been deleted.</p>
        <Button onClick={() => navigate('/projects')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
      </div>
    );
  }
  
  const handleStatusChange = (newStatus: ProjectStatus) => {
    setStatus(newStatus);
    updateProject(project.id, { status: newStatus });
  };
  
  const handleDeleteProject = () => {
    deleteProject(project.id);
    navigate('/projects');
  };
  
  const getStatusClassName = () => {
    switch (project.status) {
      case 'planned':
        return 'status-badge-planned';
      case 'in-progress':
        return 'status-badge-in-progress';
      case 'completed':
        return 'status-badge-completed';
      case 'on-hold':
        return 'status-badge-on-hold';
      case 'cancelled':
        return 'status-badge-cancelled';
      default:
        return '';
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/projects')} 
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">{project.title}</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Edit2 className="h-4 w-4" />
            Edit
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 text-destructive">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the project "{project.title}" and all its associated data.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteProject}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="tasks">
            <TabsList className="mb-6">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks" className="space-y-6">
              <TaskList tasks={project.tasks} projectId={project.id} />
            </TabsContent>
            
            <TabsContent value="details">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {project.description || 'No description provided.'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Tech Stack</h3>
                  {project.techStack.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, index) => (
                        <TechBadge key={index} name={tech} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No technologies specified.</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Timeline</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Started: {project.startDate ? format(new Date(project.startDate), 'MMMM d, yyyy') : 'Not set'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Target End: {project.endDate ? format(new Date(project.endDate), 'MMMM d, yyyy') : 'Not set'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Links</h3>
                    <div className="space-y-2">
                      {project.githubUrl ? (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                        >
                          <Github className="h-4 w-4" />
                          GitHub Repository
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Github className="h-4 w-4" />
                          No GitHub repository linked
                        </p>
                      )}
                      
                      {project.deploymentUrl ? (
                        <a 
                          href={project.deploymentUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Deployment Link
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          No deployment link added
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <div className="glass-card p-6 rounded-lg space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Project Status</h3>
              <Select value={project.status} onValueChange={(value: ProjectStatus) => handleStatusChange(value)}>
                <SelectTrigger className={`${getStatusClassName()} border-none`}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Tasks Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{project.tasks.filter(t => t.completed).length} completed</span>
                  <span>{project.tasks.length} total</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ 
                      width: `${project.tasks.length ? (project.tasks.filter(t => t.completed).length / project.tasks.length * 100) : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border/50">
              <h3 className="text-sm font-medium mb-2">Created</h3>
              <p className="text-sm text-muted-foreground">
                {format(new Date(project.createdAt), 'MMMM d, yyyy')}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Last Updated</h3>
              <p className="text-sm text-muted-foreground">
                {format(new Date(project.updatedAt), 'MMMM d, yyyy')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
