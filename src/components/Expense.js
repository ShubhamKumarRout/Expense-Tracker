import React, { useEffect, useState } from 'react'
import ExpenseTable from './ExpenseTable'
import ExpenseModal from './ExpenseModal'
import { useDispatch, useSelector } from 'react-redux'
import { createExpense, getExpenseDetails } from '../actions/expenseActions'

const Expense = (props) => {

  const expenseStore=useSelector(state=>state.expense.data)
  // const categoryDetails=useSelector(state=>state.category.data)
 
  const [expenses,setExpenses]=useState([])
  const [open,setOpen]=useState(false)
  const [expenseData,setExpenseData]=useState({})

  const dispatch=useDispatch()
  useEffect(()=>{
      dispatch(getExpenseDetails())
  },[])

  useEffect(()=>{
    setExpenses(expenseStore)
   
  },[expenseStore])

  const handleModalOpen=(ele)=>{
    setOpen(!open)
}
  const handlModaleClose=()=>{
    setExpenseData({})
    setOpen(!open)
}

const handleChangeForm=(form)=>{
  dispatch(createExpense(form,handlModaleClose))
  
}
  const filteredExpense=()=>{
    const expenseData=expenses.filter(ele=> ele.isDeleted===false)
    return expenseData
  }
 
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between'}}>
      <button className='btn' style={{ margin: '5px' }}
        onClick={handleModalOpen}
      >Add Expense</button>
      
      <button className='btn' style={{ margin: '5px' }}
        onClick={()=>{props.history.push('/LoggedInHome/Home/Archived')}}
      >
        Archived Expenses
      </button>
      </div>
      {
        filteredExpense().length>0 ? 
        <ExpenseTable rows={filteredExpense()}/> 
        : 'Add Expense'
      }
      <ExpenseModal 
        open={open}
        data={expenseData}
        handleChangeForm={handleChangeForm}
        handlModaleClose={handlModaleClose}
        btnType='add'
      />
    </div>
  )
}

export default Expense