import axios from "axios"
import swal from 'sweetalert';

export const getBudgetDetails=()=>{
    return (dispatch)=>{
        axios.get(`http://127.0.0.1:3080/user/budget`,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })   
            .then(response=>{
                const result=response.data
                console.log(result);
                if (result.hasOwnProperty('errors')) {
                    alert(result.message)
                    dispatch(setErrors(result.errors))
                }
                else{
                    
                    dispatch(setBudget(result))
                    dispatch(setErrors({}))
                    
                }
                
            }) 
            .catch(err=>{
                console.log(err);
            })
    }
            
}

const setBudget=(budget)=>{
    return{
        type:"SET_BUDGET",
        payload:budget
    }
}
const setErrors=(error)=>{
    return {
        type:'SET_BUDGET_ERROR',
        payload:error
    }
}

const editBudget=(data)=>{
    return {
        type:'UPDATE_BUDGET',
        payload:data
    }
}
export const updateBudget=(id,data)=>{
    return (dispatch)=>{
        axios.put(`http://127.0.0.1:3080/user/budget/${id}`,data,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            const result=response.data
            if (result.hasOwnProperty('errors')) {
                console.log(result.errors)
                // dispatch(setErrors(result.errors.message))
            }
            else{
                dispatch(editBudget(result))
                dispatch(setErrors({}))
                swal('Budget Updated')
            }
        })
    }
}