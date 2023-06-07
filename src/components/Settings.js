import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBudgetDetails, updateBudget } from '../actions/budgetActions'
import '../App.css'
import CategoryModal from '../components/CategoryModal'
import { TextField, Typography } from '@material-ui/core';
import swal from 'sweetalert';
import { createCategoryDetails, deleteCategoryDetails, editCategoryDetails, getCategoryDetails } from '../actions/categoryActions';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getExpenseDetails } from '../actions/expenseActions'

const Settings = () => {

    
    const [budgetDetails, setBudgetDetails] = useState(0)
    const [open,setOpen]=useState(false)
    const [editData,setEditData]=useState({})

    const [categoryDetails,setCategoryDetails]=useState('')

    const isLoading=useSelector(state=>{
        return state.budget.isLoading
    })
   
    const budget = useSelector(state => {
        return state.budget.data
    })
    const category = useSelector((state) => {
        return state.category.data
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBudgetDetails())
    }, [])
    useEffect(() => {
        dispatch(getCategoryDetails())
    }, [])
    useEffect(()=>{
        setBudgetDetails(budget)
    },[budget])
    
    
    
    useEffect(()=>{
        setCategoryDetails('')
    },[category])

    const handleBudgetChange = (e) => {
        setBudgetDetails(e.target.value)
    }
    const handleBudgetUpdate = (e) => {
        console.log(budget);
        if (budget.amount === Number(budgetDetails.amount)) {
            swal('previous budget value is same as current one. Please update', '', 'error')
        }
        else {
            const form = {
                amount: Number(budgetDetails)
            }
            dispatch(updateBudget(budget._id, form))
        }

    }

    const handleCategoryChange=(e)=>{
        setCategoryDetails(e.target.value)
    }
    const handleAddCategory=()=>{
        const form={
            categoryName:categoryDetails
        }
        dispatch(createCategoryDetails(form))
    }
    const deleteExpnses=()=>{
        dispatch(getExpenseDetails())
    }
    const handleCategoryDelete=(id)=>{
        const confirm=window.confirm('are you sure?')
        if( confirm){
            dispatch(deleteCategoryDetails(id,deleteExpnses))
        }
        
        
    }
    
    const handleOpenModal=(ele)=>{
        
        setOpen(!open)
        setEditData(ele)

    }
    const handlModaleClose=()=>{
        setEditData({})
        setOpen(!open)
    }
    const handleCategoryEdit=(formData)=>{
        dispatch(editCategoryDetails(formData._id,{categoryName:formData.categoryName},handlModaleClose))       
    }
  
   
    return (
        <div className='card-component'>
            <h2>Settings Component</h2>
            
            <div className='budget-setting'>
                <h3>Total Budget-{  isLoading?  '...' : budget.amount}</h3>

                <TextField
                    id="outlined-basic"
                    label={'Budget'}
                    name='budget'
                    variant="outlined"
                    value={budgetDetails.amount}
                    onChange={handleBudgetChange}
                />
                <button onClick={handleBudgetUpdate}
                    // disabled={budget.totalBudget.amount === Number(budgetDetails.amount)}
                    className='btn'>
                    update
                </button>
            </div>
            <div className='budget-setting'>
                <h3>Category</h3>
                <TextField
                    id="outlined-basic"
                    label={'Category'}
                    name='category'
                    variant="outlined"
                    value={categoryDetails}
                    onChange={handleCategoryChange}
                />
                <button onClick={handleAddCategory}
                    className='btn'>
                    Add Category
                </button>
                {
                    category.length === 0
                        ? <h3>No category details to display</h3>
                        : <table className='my-table'>
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th colSpan={2}>Action</th>
                                </tr>

                            </thead>
                            <tbody>
                                {
                                    category.map(ele => {
                                        return <tr key={ele._id}>
                                            <td>{ele.categoryName}</td>
                                            <td onClick={()=>{handleCategoryDelete(ele._id)}}>
                                                <Grid container sx={{ color: 'red' }} style={{cursor:'pointer'}}>
                                                    <Grid item xs={4}>
                                                        <DeleteIcon />
                                                    </Grid>
                                                </Grid>
                                            </td>
                                            <td onClick={()=>{handleOpenModal(ele)}}>
                                            <Grid container sx={{ color: '#0962fb' }} style={{cursor:'pointer'}}>
                                                    <Grid item xs={4}>
                                                        <EditIcon />
                                                    </Grid>
                                                </Grid>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                }
            </div>
            <CategoryModal
                open={open}
                handlModaleClose={handlModaleClose}
                data={editData}
                handleCategoryEdit={handleCategoryEdit}
            />
        </div>
    )
}

export default Settings