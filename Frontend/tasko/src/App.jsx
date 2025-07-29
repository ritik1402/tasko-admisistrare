import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import {  Routes, Route } from 'react-router-dom'
import AuthPage from './components/AuthPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        
          <Route path="/signup" element={<AuthPage />} />
          
        
      </Routes>
    </>
  )
}

export default App
