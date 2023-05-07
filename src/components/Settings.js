import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { getBudgetDetails, updateBudget } from '../actions/budgetActions'
const Settings = () => {

    const budget=useSelector(state=>{
        return state.budget.data
    })

    const [budgetDetails,setBudgetDetails]=useState(budget)

    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getBudgetDetails())
    },[])

    const handleChange=(e)=>{
        setBudgetDetails({...budget,amount:e.target.value})
    }
    const handleUpdate=(e)=>{
        console.log(budget._id);
        console.log(typeof(budgetDetails.amount));
        const form={
            amount:Number(budgetDetails.amount)
        }
        dispatch(updateBudget(budget._id,form))
    }
  return (
    <>
        <h2>Settings Component</h2>
        <div>
            <h3>Total Budget</h3>
           <input value={budgetDetails.amount} onChange={handleChange}/>
           
           <button onClick={handleUpdate} disabled={budget.amount===Number(budgetDetails.amount)}>update</button>
        </div>
    </>
  )
}

export default Settings