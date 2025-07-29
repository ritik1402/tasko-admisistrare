import React from 'react'

const Login = () => {
  return (
    <div className='login flex justify-between max-w-[70%] h-[70vh] border-2 border-amber-200 mx-auto mt-16'>
      <div className='left bg-[url(./images/bg3.svg)] w-[50%] bg-cover bg-no-repeat flex items-center justify-center'>
        <h2 className='text-4xl text-[var(--small-color)] font-semibold'>
          Welcome Back, Explorer!
        </h2>
      </div>

      <div className='right bg-[var(--secondary)] w-[50%] flex flex-col'>
        <h2 className='text-[var(--primary)] text-3xl ml-8 mt-8 mb-10'>
          Log In
        </h2>

        <form className='flex flex-col bg-[var(--text-color)] rounded-2xl p-6 mx-8 text-lg justify-center items-center gap-6'>

          <div className='w-full'>
            <label className='text-[var(--small-color)] block mb-1'>Username:</label>
            <input 
              type="text" 
              name="username" 
              placeholder='Enter username here' 
              required 
              className='w-full border-b-2 border-[var(--primary)] bg-transparent text-[var(--secondary)] focus:outline-none focus:border-[var(--small-color)] transition-all duration-300 p-2' 
            />
          </div>

          <div className='w-full'>
            <label className='text-[var(--small-color)] block mb-1'>Password:</label>
            <input 
              type="password" 
              name="password" 
              placeholder='Enter your password here' 
              required 
              className='w-full border-b-2 border-[var(--primary)] bg-transparent text-[var(--secondary)] focus:outline-none focus:border-[var(--small-color)] transition-all duration-300 p-2' 
            />
          </div>

          <button 
            type="submit" 
            className='mt-8 bg-[var(--secondary)] border-2 border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--secondary)] text-[var(--text-color)] font-bold text-xl px-6 py-2 rounded-2xl transition-all duration-300'
          >
            Login
          </button>

        </form>
      </div>
    </div>
  )
}

export default Login
