
import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-10 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
              ProjectPilot
            </span>
            <p className="text-sm text-muted-foreground mt-2">
              Project tracking for indie hackers.
            </p>
          </div>
          
          <div className="flex space-x-4 mb-6 md:mb-0">
            <a href="#" className="text-muted-foreground hover:text-foreground transition">
              About
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">
              Features
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">
              Pricing
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">
              Blog
            </a>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© 2025 ProjectPilot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
