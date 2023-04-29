import React,{useEffect} from 'react'
import './App.css'
import LoggedInHome from './components/LoggedInHome'
import LoggedOutHome from './components/LoggedOutHome'
import { useSelector,useDispatch } from 'react-redux'
import { startGetUser } from './actions/userActions'
import {Link,Route} from 'react-router-dom'

const App=(props)=>{


  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(startGetUser())
  },[])

  const user=useSelector(state=>{
    return state.user
  })


  return(
    <div>
      <h1>Expense Tracker</h1>
      {
        Object.keys(user.data).length>0 
        ? <LoggedInHome/>
        :<LoggedOutHome/>
      }
      
    </div>
  )
}

export default App