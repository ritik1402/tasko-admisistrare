import React from 'react'
import {useState} from 'react'
import Login from './Login'
import Signup from './Signup'
import { useNavigate } from 'react-router-dom'

const AuthPage = () => {
    const navigate = useNavigate();

    const [isLogin,setIsLogin] = useState(true)

  return (
    <div>
        {isLogin ? <Login/> : <Signup/>}
        
            {isLogin ?(
                <>
                <h4>Don't have an account ?</h4> 
                <button onClick={() => setIsLogin(false)}>Signup</button>
                </>
            ) : (
                <>
                <p>Already have an account ?</p>
                <button onClick ={()=> {navigate("/signup"); setIsLogin(true)}}>Login</button>

                </>
            )}


        
      
    </div>
  )
}

export default AuthPage
