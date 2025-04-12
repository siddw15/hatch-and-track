
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProjectProvider } from "@/context/ProjectContext";
import MainLayout from "@/components/layout/MainLayout";
import Landing from "@/pages/Landing";
import Dashboard from "@/pages/Dashboard";
import ProjectList from "@/pages/ProjectList";
import ProjectDetail from "@/pages/ProjectDetail";
import CreateProject from "@/pages/CreateProject";
import CalendarView from "@/pages/CalendarView";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ProjectProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            
            <Route path="/dashboard" element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            } />
            
            <Route path="/projects" element={
              <MainLayout>
                <ProjectList />
              </MainLayout>
            } />
            
            <Route path="/projects/new" element={
              <MainLayout>
                <CreateProject />
              </MainLayout>
            } />
            
            <Route path="/projects/:id" element={
              <MainLayout>
                <ProjectDetail />
              </MainLayout>
            } />
            
            <Route path="/calendar" element={
              <MainLayout>
                <CalendarView />
              </MainLayout>
            } />
            
            <Route path="/settings" element={
              <MainLayout>
                <Settings />
              </MainLayout>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ProjectProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
