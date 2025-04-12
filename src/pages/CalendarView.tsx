
import React from 'react';
import ProjectCalendar from '@/components/calendar/ProjectCalendar';

const CalendarView: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Calendar</h1>
        <p className="text-muted-foreground">View and manage your project schedule</p>
      </div>
      
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <ProjectCalendar />
      </div>
    </div>
  );
};

export default CalendarView;
