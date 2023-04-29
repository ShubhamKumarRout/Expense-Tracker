import React,{useState,useEffect} from 'react'
import Register from './forms/Register'
import Login from './forms/Login'

const LoggedOutHome = () => {
    const [login,setLogin]=useState(false)
  const [register,setRegister]=useState(true)

  const handleRegisterForm=()=>{
    setRegister(true)
    setLogin(false)
  }

  const handleLogInForm=()=>{
    setLogin(true)
    setRegister(false)
  }
  return (
    <div>
        <div className='switch-content'>
        <button onClick={handleRegisterForm}>Register</button>
        <button onClick={handleLogInForm}>LogIn</button>
      </div>
      {register ? 
        <Register handleLogInForm={handleLogInForm}/>
        :
        <Login handleRegisterForm={handleRegisterForm}/>
      }
    </div>
  )
}

export default LoggedOutHome