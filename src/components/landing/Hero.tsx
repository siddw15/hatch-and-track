
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600 tracking-tight">
        Ship Your Next Project Faster
      </h1>
      
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
        Project tracking for indie hackers and solo developers.
        Simple, fast, and elegant.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild size="lg" className="gap-2">
          <Link to="/dashboard">
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        
        <Button asChild variant="outline" size="lg">
          <a href="#features">
            Learn More
          </a>
        </Button>
      </div>
      
      <div className="mt-20 w-full max-w-4xl">
        <div className="glass-card rounded-lg overflow-hidden shadow-lg animate-fade-in">
          <img 
            src="https://placehold.co/1200x800/1a1f2c/9b87f5?text=ProjectPilot+Dashboard&font=montserrat" 
            alt="ProjectPilot Dashboard Preview" 
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
