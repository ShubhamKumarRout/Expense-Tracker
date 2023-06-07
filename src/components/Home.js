import React,{useState,useEffect} from 'react'
import '../App.css'
import ExpenseTable from './ExpenseTable';
import Expense from './Expense';
import { useDispatch } from 'react-redux';
import { getCategoryDetails } from '../actions/categoryActions';
import { getBudgetDetails } from '../actions/budgetActions';
import { getExpenseDetails } from '../actions/expenseActions';
import { withRouter } from 'react-router-dom';
import BudgetOverview from './BudgetOverview';
import CategoryOverview from './CategoryOverview';

const Home=(props)=>{
    
    const dispatch=useDispatch()
    useEffect(() => {
        dispatch(getCategoryDetails())
    }, [])
      
    return(
        <div className='card-component'>
           
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <BudgetOverview/>
                <CategoryOverview/>
            </div>
            <div>
            <Expense {...props}/>
            
            </div>
        </div>
    )   
}
export default withRouter(Home)