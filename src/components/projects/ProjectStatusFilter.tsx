
import React from 'react';
import { Button } from '@/components/ui/button';
import { ProjectStatus } from '@/types';

interface ProjectStatusFilterProps {
  activeStatus: ProjectStatus | 'all';
  onFilterChange: (status: ProjectStatus | 'all') => void;
}

const ProjectStatusFilter: React.FC<ProjectStatusFilterProps> = ({ 
  activeStatus, 
  onFilterChange 
}) => {
  const statuses: Array<{ value: ProjectStatus | 'all', label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'planned', label: 'Planned' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'on-hold', label: 'On Hold' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <Button
          key={status.value}
          variant={activeStatus === status.value ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(status.value)}
          className="capitalize"
        >
          {status.label}
        </Button>
      ))}
    </div>
  );
};

export default ProjectStatusFilter;
