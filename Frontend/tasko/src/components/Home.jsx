import React from 'react';
import { useAuth } from '../context/AuthContext';



const Home = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#273F4F] text-white">
        <h1 className="text-3xl font-bold mb-4">Welcome to Tasko Administrare</h1>
        <p className="text-lg">Please login first to access the dashboard.</p>
      </div>
    );
  }

  
};

export default Home;
