
import React from 'react';
import { Project } from '@/types';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle, PauseCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getStatusIcon = () => {
    switch (project.status) {
      case 'planned':
        return <Clock className="h-4 w-4 text-blue-400" />;
      case 'in-progress':
        return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'on-hold':
        return <PauseCircle className="h-4 w-4 text-orange-400" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    return project.status.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase());
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

  const completedTasks = project.tasks.filter(task => task.completed).length;
  const totalTasks = project.tasks.length;

  return (
    <Card className="h-full hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Link to={`/projects/${project.id}`} className="hover:underline">
            <h3 className="text-lg font-semibold line-clamp-1">{project.title}</h3>
          </Link>
          <div className={`status-badge ${getStatusClassName()}`}>
            <span className="flex items-center">
              {getStatusIcon()}
              <span className="ml-1">{getStatusText()}</span>
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {project.techStack.slice(0, 3).map((tech, index) => (
            <Badge key={index} variant="outline" className="bg-secondary/50">
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 3 && (
            <Badge variant="outline" className="bg-secondary/50">
              +{project.techStack.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>Tasks:</span>
          <span className="font-medium">{completedTasks}/{totalTasks}</span>
          <span className="flex-1">
            <div className="w-full bg-secondary/50 rounded-full h-1.5">
              <div 
                className="bg-purple-500 h-1.5 rounded-full" 
                style={{ width: `${totalTasks ? (completedTasks / totalTasks * 100) : 0}%` }}
              ></div>
            </div>
          </span>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground pt-0">
        {project.startDate && (
          <span>
            Started: {format(new Date(project.startDate), 'MMM d, yyyy')}
          </span>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
