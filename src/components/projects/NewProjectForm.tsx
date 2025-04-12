
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '@/context/ProjectContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectStatus } from '@/types';

const NewProjectForm: React.FC = () => {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('planned');
  const [techStack, setTechStack] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  
  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && techInput.trim() !== '') {
      e.preventDefault();
      
      // Add tech if it doesn't already exist
      if (!techStack.includes(techInput.trim())) {
        setTechStack([...techStack, techInput.trim()]);
      }
      
      setTechInput('');
    }
  };
  
  const handleRemoveTech = (techToRemove: string) => {
    setTechStack(techStack.filter(tech => tech !== techToRemove));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title) return;
    
    const projectId = addProject({
      title,
      description,
      status,
      techStack,
      tasks: [],
    });
    
    navigate(`/projects/${projectId}`);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Project Title <span className="text-red-500">*</span>
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Awesome Project"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Briefly describe your project..."
            rows={4}
          />
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status
          </label>
          <Select value={status} onValueChange={(value: ProjectStatus) => setStatus(value)}>
            <SelectTrigger>
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
          <label htmlFor="techStack" className="block text-sm font-medium mb-1">
            Tech Stack
          </label>
          <Input
            id="techStack"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={handleTechKeyDown}
            placeholder="Add technologies (press Enter to add)"
          />
          {techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {techStack.map((tech, index) => (
                <div 
                  key={index} 
                  className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm flex items-center"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="submit" disabled={!title}>
          Create Project
        </Button>
      </div>
    </form>
  );
};

export default NewProjectForm;
