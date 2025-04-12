
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import NewProjectForm from '@/components/projects/NewProjectForm';

const CreateProject: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)} 
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Create New Project</h1>
      </div>
      
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <NewProjectForm />
      </div>
    </div>
  );
};

export default CreateProject;
