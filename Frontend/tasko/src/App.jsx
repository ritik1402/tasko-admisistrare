import { useState,useContext  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <AuthProvider>
      
    </AuthProvider>
    
     
    </>
  )
}

export default App
