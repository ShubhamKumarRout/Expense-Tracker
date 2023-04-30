import React, { useEffect } from 'react'
import LoggedInHome from './LoggedInHome'
import LoggedOutHome from './LoggedOutHome'
import { withRouter } from 'react-router-dom'
import { Route } from 'react-router-dom/cjs/react-router-dom.min';

const Navigation = (props) => {

    const { isLoggedIn, handleAuth } = props

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            props.history.push('/LoggedInHome')
        }
        else{
            props.history.push('/LoggedOutHome')
        }
    }, [])
    return (
        <>
            

            {
                isLoggedIn
                ?
                <LoggedInHome handleAuth={handleAuth}/>
                :
                <LoggedOutHome handleAuth={handleAuth}/>
            }

            <div>
                <Route path='/LoggedInHome' render={(props)=>{
                    <LoggedInHome {...props} handleAuth={handleAuth}/>
                }} exact={true}/>
                <Route path='/LoggedOutHome' render={(props)=>{
                    <LoggedOutHome {...props} handleAuth={handleAuth}/>
                }} exact={true}/>
            </div>

        </>
    )
}

export default withRouter(Navigation) 