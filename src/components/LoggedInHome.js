import React from 'react'
import '../App.css'
import { withRouter } from 'react-router-dom'
import swal from 'sweetalert'


const LoggedInHome = (props) => {
  const {handleAuth}=props

  const handleLogOut=()=>{
    localStorage.removeItem('token')
    swal("Logged Out Succesfully");
    handleAuth()
    props.history.push('/LoggedOutHome/register')
  }

  const handleHomeClick=()=>{
    props.history.push('/LoggedInHome/Home')
  }
  const handleProfileClick=()=>{
    props.history.push('/LoggedInHome/Profile')
  }
  const handleSettingsClick=()=>{
    props.history.push('/LoggedInHome/Settings')
  }
  return (
    <>
      <div className='navbar'>
       
        <ul className="list">
          <li className="items" onClick={handleHomeClick}>Home</li>
          <li className="items" onClick={handleSettingsClick}>Settings</li>
          <li className="items" onClick={handleProfileClick}>Profile</li>
          <li className="items" onClick={handleLogOut}>Log Out</li>
        </ul>
      </div>
    </>
    
  )
}

export default withRouter(LoggedInHome)