import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const handleLogin = () => {
    navigate('/login')
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center mt-64  h-full relative  text-white ">

        <h1 className="text-3xl font-bold mb-4">Welcome to Tasko Administrare</h1>
        <p className="text-lg">Please login first to access the dashboard.</p>
        <button
            onClick={handleLogin}
            className="border border-[var(--secondary)] px-4 py-1 rounded bg-[var(--primary)] hover:text-[var(--text-color)] transition-all cursor-pointer mt-5"
          >
            Login
          </button>
       
      </div>
    );
  }

  
};

export default Home;
