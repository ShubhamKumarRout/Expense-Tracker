import React, { useEffect } from 'react'
import LoggedInHome from './LoggedInHome'
import LoggedOutHome from './LoggedOutHome'
import { withRouter } from 'react-router-dom'
import { Route } from 'react-router-dom';
import Register from './forms/Register';
import Login from './forms/Login';
import Home from './Home';
import Profile from './Profile'
import Settings from './Settings';

const Navigation = (props) => {

    const { isLoggedIn, handleAuth } = props

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            props.history.push('/LoggedInHome/Home')
        }
        else {
            props.history.push('/LoggedOutHome/register')
        }
    }, [])
    return (
        <>


            {
                isLoggedIn
                    ?
                    <LoggedInHome handleAuth={handleAuth} />
                    :
                    <LoggedOutHome handleAuth={handleAuth} />
            }

            
                <Route path='/LoggedInHome' render={(props) => {
                    return (
                        <LoggedInHome {...props} handleAuth={handleAuth} />
                    )

                }} exact={true} />
                <Route path='/LoggedOutHome' render={(props) => {
                    return(
                        <LoggedOutHome {...props} handleAuth={handleAuth} />
                    )
                }} exact={true} />
                <Route path='/LoggedOutHome/register' render={(props) => {
                    return(
                        <Register {...props} handleAuth={handleAuth} />
                    )
                }} exact={true} />
                <Route path='/LoggedOutHome/login' render={(props) => {
                   return(
                    <Login {...props} handleAuth={handleAuth} />
                   )
                }} exact={true} />
                <Route path='/LoggedInHome/Home' render={(props) => {
                    return (
                        <Home {...props} handleAuth={handleAuth} />
                    )
                }} exact={true} />
                <Route path='/LoggedInHome/Profile' render={(props) => {
                    return (
                        <Profile/>
                    )
                }}
                
                />
                <Route path='/LoggedInHome/Settings' render={(props) => {
                    return (
                        <Settings/>
                    )
                }}
                
                />
            

        </>
    )
}

export default withRouter(Navigation) 