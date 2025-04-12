
import React, { useState } from 'react';
import { Task } from '@/types';
import TaskItem from './TaskItem';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useProjects } from '@/context/ProjectContext';

interface TaskListProps {
  tasks: Task[];
  projectId: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, projectId }) => {
  const { addTask } = useProjects();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(projectId, {
        title: newTaskTitle.trim(),
        completed: false,
      });
      setNewTaskTitle('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by completion status first (incomplete first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // Then sort by due date if it exists (earliest first)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    
    // Tasks with due dates come before tasks without due dates
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    
    // Finally, sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button onClick={handleAddTask} disabled={!newTaskTitle.trim()}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
      
      <div className="mt-4">
        {sortedTasks.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <p>No tasks yet. Add your first task above!</p>
          </div>
        ) : (
          <div>
            {sortedTasks.map((task) => (
              <TaskItem key={task.id} task={task} projectId={projectId} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
