import React from 'react'
import Register from './forms/Register'

import { Link,withRouter } from 'react-router-dom'

const LoggedOutHome = (props) => {

  const {handleAuth}=props

  const handleRegisterForm=()=>{
   
    props.history.push('/LoggedOutHome/register')
  }

  const handleLogInForm=()=>{
    
    props.history.push('/LoggedOutHome/login')
  }
  return (
    <div>
        <div className='switch-content'>
        <button onClick={handleRegisterForm}>Register</button>
        <button onClick={handleLogInForm}>LogIn</button>
      </div>
      
    </div>
  )
}

export default withRouter(LoggedOutHome)