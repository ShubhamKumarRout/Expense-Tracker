import React,{useState,useEffect} from 'react'
import './App.css'
import LoggedInHome from './components/LoggedInHome'
import LoggedOutHome from './components/LoggedOutHome'
import { useSelector,useDispatch } from 'react-redux'
import { startGetUser } from './actions/userActions'
import {Link,Route} from 'react-router-dom'
import Navigation from './components/Navigation'

const App=(props)=>{


  const [isLoggedIn,setIsLoggedIn]=useState(false)

  const handleAuth=()=>{
    console.log('handleAuth');
    setIsLoggedIn(!isLoggedIn)
  }

  useEffect(()=>{

    // console.log(localStorage.getItem('token'));
    if(localStorage.getItem('token')){
      handleAuth()
    }
  },[])

 

  return(
    <div>
      <h1>Expense Tracker</h1>
      <Navigation isLoggedIn={isLoggedIn} handleAuth={handleAuth}/>  
    </div>
  )
}

export default App