import axios from "axios"
import swal from "sweetalert"

const setErrors=(error)=>{
    return {
        type:'SET_EXPENSE_ERROR',
        payload:error
    }
}

const getExpense=(data)=>{
    return({
        type:'SET_EXPENSE',
        payload:data
    })
}
const setIsLoading=()=>{
    return({
        type:'SET_EXPENSE_IS_LOADING',
        
    })
}

export const getExpenseDetails=()=>{
    return (dispatch)=>{
        axios.get('http://127.0.0.1:3080/user/expense',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            const result=response.data
            console.log('expense',result);
            if(result.hasOwnProperty('errors')){
                swal(result.errors.message,'','error')
                dispatch(setErrors(result))
            }
            else{
                
                dispatch(getExpense(result))
                dispatch(setIsLoading())
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

const createNewExpense=(data)=>{
    return({
        type:'CREATE_EXPENSE',
        payload:data
    })
}
export const createExpense=(form,handlModaleClose)=>{
    
    return (dispatch)=>{
        
        axios.post('http://127.0.0.1:3080/user/expense',form,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            const result=response.data
            console.log('expense',result);
            if(result.hasOwnProperty('errors')){
                
                dispatch(setErrors(result))
                swal(result.errors.message,'','error')
            }
            else{
                dispatch(createNewExpense(result))
                handlModaleClose()
                swal('Expense created successfully','','success')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

const getUpdatedExpense=(data)=>{
    return({
        type:'UPDATE_EXPENSE',
        payload:data
    })
}
export const updateExpense=(id,form,handlModaleClose)=>{
    
    
    return (dispatch)=>{
        
        axios.put(`http://127.0.0.1:3080/user/expense/${id}`,form,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            const result=response.data
            if(result.hasOwnProperty('errors')){
                
                dispatch(setErrors(result))
                swal(result.errors.message,'','error')
            }
            else{
                dispatch(getUpdatedExpense(result))
                handlModaleClose()
                swal('Expense updated successfully','','success')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

const getdeletedExpense=(data)=>{
    return({
        type:'DELETE_EXPENSE',
        payload:data
    })
}
export const deleteExpense=(id)=>{
    
    
    return (dispatch)=>{
        
        axios.delete(`http://127.0.0.1:3080/user/expense/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            const result=response.data
            if(result.hasOwnProperty('errors')){
                
                dispatch(setErrors(result))
                swal(result.errors.message,'','error')
            }
            else{
                dispatch(getdeletedExpense(result))
                swal('Expense deleted successfully','','success')
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
}