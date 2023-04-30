import React from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { startGetUser } from '../actions/userActions'
import swal from 'sweetalert'

const LoggedInHome = (props) => {
  const {handleAuth}=props

  const dispatch=useDispatch()

  const handleLogOut=()=>{
    localStorage.removeItem('token')
    swal("Logged Out Succesfully");
    handleAuth()
    // props.history.push('/Home/LoggedOut/register')
  }

  return (
    <div>LoggedInHome
      <button onClick={handleLogOut}>log out</button>
    </div>
    
  )
}

export default withRouter(LoggedInHome)