import React,{useState,useEffect} from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import Navigation from './components/Navigation'

const App=(props)=>{


  const [isLoggedIn,setIsLoggedIn]=useState(false)

  const user=useSelector((state)=>{
    return state.user.data
  })

  const handleAuth=()=>{
    setIsLoggedIn(!isLoggedIn)
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
      handleAuth()
    }
  },[])

 

  return(
    <div className='container'>
      <div>
      <h1>Expense Tracker</h1>
      </div>
      <Navigation isLoggedIn={isLoggedIn} handleAuth={handleAuth}/>  
    </div>
  )
}

export default App