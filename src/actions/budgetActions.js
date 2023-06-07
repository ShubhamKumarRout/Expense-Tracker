import axios from "axios"
import swal from 'sweetalert';

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
const setIsLoading=(bool)=>{
    return {
        type:'SET_BUDGET_IS_LOADING',
        payload:bool
    }
}
export const getBudgetDetails=()=>{
    
    return (dispatch)=>{
        axios.get(`http://127.0.0.1:3080/user/budget`,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })   
            .then(response=>{
                const result=response.data
                if (result.hasOwnProperty('errors')) {
                    alert(result.message)
                    dispatch(setErrors(result.errors))
                }
                else{
                    
                    dispatch(setBudget(result))
                    dispatch(setIsLoading(false))
                    dispatch(setErrors({}))
                    
                }
                
            }) 
            .catch(err=>{
                console.log(err);
            })
    }
            
}



const editBudget=(data)=>{
    return {
        type:'UPDATE_BUDGET',
        payload:data
    }
}
export const updateBudget=(id,data)=>{
    console.log('budgetaction',id);
    const token=localStorage.getItem('token')
    return (dispatch)=>{
        axios.put(`http://127.0.0.1:3080/user/budget/${id}`,data,{
            headers:{
                'x-auth':token
            }
        })
        .then(response=>{
            const result=response.data
            console.log(result);
            if (result.hasOwnProperty('errors')) {
                swal(result.errors)
                dispatch(setErrors(result.errors.message))
            }
            else{
                dispatch(editBudget(result))
                dispatch(setErrors({}))
                dispatch(setIsLoading(false))
                swal('Budget Updated','',"success")
            }
        })
    }
}