
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTA: React.FC = () => {
  return (
    <div className="py-20">
      <div className="glass-card p-10 rounded-lg max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to ship your next big idea?</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Start tracking your projects today and turn your ideas into reality with ProjectPilot.
        </p>
        
        <Button asChild size="lg">
          <Link to="/dashboard">
            Get Started Now
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CTA;
