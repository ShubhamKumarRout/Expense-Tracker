import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const BudgetOverview = () => {


    const budgetStore = useSelector(state => state.budget.data)
    const expenseStore = useSelector(state => state.expense.data)

    const [remainingBudget, setRemainingBudget] = useState(0)
    const [totalExpense, setTotalExpense] = useState(0)
    const [data, setData] = useState({})

    useEffect(() => {
        const expense = expenseStore.reduce((prev, next) => {
            return prev + next.amount
        }, 0)
        setTotalExpense(expense)
    }, [expenseStore])

    useEffect(() => {
        const remainingBudget = budgetStore.amount - totalExpense
        setRemainingBudget(remainingBudget)
    }, [budgetStore, expenseStore])

    useEffect(() => {
        setData(
            {
                labels: [`${(totalExpense*100/budgetStore.amount).toFixed(2)}% spent`],
                datasets: [
                    {
                        label: '',
                        data: [totalExpense, remainingBudget],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',

                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',

                        ],
                        borderWidth: 1,
                    },
                ],
            }
        )
    }, [remainingBudget, totalExpense])
   

    return (
        < div>
            <div>
            {Object.keys(data).length > 0 &&
                <Doughnut data={data} />}
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <p>Total Budget: {budgetStore.amount}</p>  
                <p>Total Expense: {totalExpense}</p>
            </div>

        </div>
    )

}

export default BudgetOverview