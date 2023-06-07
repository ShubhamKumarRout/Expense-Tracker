import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ExpenseTable from './ExpenseTable'
import { useSelector } from 'react-redux'

const ArchivedExpenses = (props) => {

    const expenseStore=useSelector(state=>state.expense.data)
    // console.log(props);
    const [expenses,setExpenses]=useState([])

    useEffect(()=>{
        setExpenses(expenseStore)
        archivedExpenses()
      },[expenseStore])

    const location = useLocation()
    // const archivedExpenses = location.state

    const archivedExpenses=()=>{
        const expenseData=expenses.filter(ele=> ele.isDeleted===true)
        return expenseData
      }

    console.log(archivedExpenses());
    return (
        <div className='card-component'>
            <div style={{ display: 'flex'}}>
                <button className='btn'
                    onClick={() => { props.history.push('/LoggedInHome/Home') }}>
                    Back
                </button>
            </div>
            {
                archivedExpenses().length===0 ?
                <h1>
                    No Data to Display
                </h1>
                :
                <div>
                <ExpenseTable
                    title='Archived Expenses'
                    rows={archivedExpenses()}
                    archiveBtn={true}
                />
            </div>
            }
            
        </div>
    )
}

export default ArchivedExpenses