import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { user, logout } = useAuth()
  
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const handleHome = () => {
    if(user){
      navigate('/dashboard/add-task')
    }
    else{
      navigate('/');
    }
  }
 

  return (
    <div className="navbar w-full flex justify-between items-center px-6 py-4 bg-[var(--secondary)] shadow-md">

      <h1 className="text-2xl font-bold text-[var(--primary)] cursor-pointer" onClick={()=> handleHome()}>Tasko Administrare</h1>

      <div className="flex items-center gap-6 text-[var(--primary)] text-lg font-medium">
        {user ? (
          <>
            
            <button
              onClick={handleLogout}
              className="border border-[var(--primary)] px-3 py-1 rounded hover:bg-[var(--primary)] hover:text-[var(--secondary)] transition-all cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="border border-[var(--primary)] px-4 py-1 rounded hover:bg-[var(--primary)] hover:text-[var(--secondary)] transition-all cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
