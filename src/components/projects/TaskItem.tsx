
import React, { useState } from 'react';
import { Task } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, Calendar, Pencil } from 'lucide-react';
import { format } from 'date-fns';
import { useProjects } from '@/context/ProjectContext';
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

interface TaskItemProps {
  task: Task;
  projectId: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, projectId }) => {
  const { toggleTaskStatus, deleteTask } = useProjects();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    deleteTask(projectId, task.id);
    setIsDeleting(false);
  };

  return (
    <div className="flex items-center gap-3 py-2 border-b border-border/50 group">
      <Checkbox 
        checked={task.completed} 
        onCheckedChange={() => toggleTaskStatus(projectId, task.id)}
        className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
      />
      
      <div className="flex-1">
        <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
          {task.title}
        </p>
        
        {task.dueDate && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Calendar className="h-3 w-3" />
            <span>Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Pencil className="h-4 w-4" />
        </Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this task.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default TaskItem;
