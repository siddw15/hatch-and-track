
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Landing from './Landing';

const Index = () => {
  const navigate = useNavigate();

  // Redirect to the landing page which is now our main entry point
  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return <Landing />;
};

export default Index;
