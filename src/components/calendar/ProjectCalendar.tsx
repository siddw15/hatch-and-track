
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useProjects } from '@/context/ProjectContext';
import { Badge } from '@/components/ui/badge';
import { Task, Project } from '@/types';

interface CalendarDayInfo {
  tasks: Array<{ task: Task; project: Project }>;
  projectStarts: Project[];
  projectEnds: Project[];
}

const ProjectCalendar: React.FC = () => {
  const { projects } = useProjects();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Extract all dates that have tasks or are project start/end dates
  const getDayInformation = (date: Date): CalendarDayInfo => {
    const dateString = format(date, 'yyyy-MM-dd');
    const info: CalendarDayInfo = {
      tasks: [],
      projectStarts: [],
      projectEnds: [],
    };
    
    projects.forEach(project => {
      // Check for project start dates
      if (project.startDate) {
        const startDate = format(new Date(project.startDate), 'yyyy-MM-dd');
        if (startDate === dateString) {
          info.projectStarts.push(project);
        }
      }
      
      // Check for project end dates
      if (project.endDate) {
        const endDate = format(new Date(project.endDate), 'yyyy-MM-dd');
        if (endDate === dateString) {
          info.projectEnds.push(project);
        }
      }
      
      // Check for tasks with due dates
      project.tasks.forEach(task => {
        if (task.dueDate) {
          const dueDate = format(new Date(task.dueDate), 'yyyy-MM-dd');
          if (dueDate === dateString) {
            info.tasks.push({ task, project });
          }
        }
      });
    });
    
    return info;
  };
  
  const renderDayContent = (day: Date) => {
    const info = getDayInformation(day);
    
    const hasEvents = info.tasks.length > 0 || 
                      info.projectStarts.length > 0 || 
                      info.projectEnds.length > 0;
    
    if (!hasEvents) return null;
    
    return (
      <div className="w-full h-2 flex gap-1 justify-center mt-1">
        {info.tasks.length > 0 && (
          <div className="w-1 h-1 rounded-full bg-purple-500"></div>
        )}
        {info.projectStarts.length > 0 && (
          <div className="w-1 h-1 rounded-full bg-green-500"></div>
        )}
        {info.projectEnds.length > 0 && (
          <div className="w-1 h-1 rounded-full bg-blue-500"></div>
        )}
      </div>
    );
  };
  
  // Selected day's events
  const selectedDayInfo = selectedDate ? getDayInformation(selectedDate) : null;
  
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          components={{
            DayContent: ({ day }) => (
              <>
                {day.day}
                {renderDayContent(day.date)}
              </>
            ),
          }}
        />
        
        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <span>Tasks</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>Project Start</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>Project End</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1">
        {selectedDate && selectedDayInfo && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">
                {format(selectedDate, 'MMMM d, yyyy')}
              </h3>
              
              {selectedDayInfo.tasks.length === 0 && 
               selectedDayInfo.projectStarts.length === 0 && 
               selectedDayInfo.projectEnds.length === 0 && (
                <p className="text-muted-foreground">No events for this day.</p>
              )}
            </div>
            
            {selectedDayInfo.tasks.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                  Tasks Due
                </h4>
                <ul className="space-y-2">
                  {selectedDayInfo.tasks.map(({ task, project }) => (
                    <li key={task.id} className="bg-secondary/50 p-2 rounded-md">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <p className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Project: {project.title}
                          </p>
                        </div>
                        <Badge variant={task.completed ? 'outline' : 'secondary'}>
                          {task.completed ? 'Completed' : 'Pending'}
                        </Badge>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {selectedDayInfo.projectStarts.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  Projects Starting
                </h4>
                <ul className="space-y-2">
                  {selectedDayInfo.projectStarts.map(project => (
                    <li key={project.id} className="bg-secondary/50 p-2 rounded-md">
                      <p className="text-sm">{project.title}</p>
                      <p className="text-xs text-muted-foreground">Status: {project.status}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {selectedDayInfo.projectEnds.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  Projects Ending
                </h4>
                <ul className="space-y-2">
                  {selectedDayInfo.projectEnds.map(project => (
                    <li key={project.id} className="bg-secondary/50 p-2 rounded-md">
                      <p className="text-sm">{project.title}</p>
                      <p className="text-xs text-muted-foreground">Status: {project.status}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCalendar;
