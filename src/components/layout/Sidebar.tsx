
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FolderKanban, Calendar, Settings, PlusCircle, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <SidebarComponent>
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              ProjectPilot
            </span>
          </Link>
          <SidebarTrigger className="md:hidden">
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-6">
        <nav className="space-y-2">
          <Link to="/" className={cn("sidebar-item", isActive("/") && "active")}>
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link to="/projects" className={cn("sidebar-item", isActive("/projects") && "active")}>
            <FolderKanban className="h-5 w-5" />
            <span>Projects</span>
          </Link>
          <Link to="/calendar" className={cn("sidebar-item", isActive("/calendar") && "active")}>
            <Calendar className="h-5 w-5" />
            <span>Calendar</span>
          </Link>
          <Link to="/settings" className={cn("sidebar-item", isActive("/settings") && "active")}>
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>
        
        <div className="mt-8">
          <Button className="w-full" variant="default">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-border/50">
        <div className="text-xs text-muted-foreground">
          <p>© 2025 ProjectPilot</p>
          <p>v0.1.0</p>
        </div>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
