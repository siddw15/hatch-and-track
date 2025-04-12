
import React from 'react';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <Hero />
        <Features />
        <CTA />
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
