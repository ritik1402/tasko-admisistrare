import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    logout()
    navigate('/')
    }
    const handleLogin = () => {
        navigate('/signup')
        }


 
  return ( 
    <div className="navbar flex justify-between mx-auto p-4 bg-[var(--secondary)]">
      <h1 className='text-2xl  font-bold text-[var(--primary)]'>Tasko Administrare</h1>
      <div className="flex text-[var(--primary)] text-xl ">
      {
        user ? (
          <>
            <p className="text-lg font-bold">Welcome {user.name}</p>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={()=> handleLogin()}>
              Login
            </button>
          </>
        )
      }
      </div>
    </div>
  );
}

export default Navbar;
