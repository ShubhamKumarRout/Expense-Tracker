import React from 'react'


import { withRouter } from 'react-router-dom'

const LoggedOutHome = (props) => {

  const { handleAuth } = props

  const handleRegisterForm = () => {

    props.history.push('/LoggedOutHome/register')
  }

  const handleLogInForm = () => {

    props.history.push('/LoggedOutHome/login')
  }
  return (
    <>
      <div className='navbar'>
        <div className='title'>
          Expense Tracker
        </div>
        <div>
          <ul className="list">
            <li className="items" onClick={handleRegisterForm}>Register</li>
            <li className="items" onClick={handleLogInForm}>Log In</li>

          </ul>
        </div>
      </div>
    </>
  )
}

export default withRouter(LoggedOutHome)