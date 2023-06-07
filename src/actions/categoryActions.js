import axios from "axios"
import swal from "sweetalert"

const token=localStorage.getItem('token')

const setErrors=(error)=>{
    return {
        type:'SET_CATEGORY_ERROR',
        payload:error
    }
}
const setIsLoading=()=>{
    return ({
        type:'SET_CATEGORY_IS_LOADING',
        
    })
}
const getCategory=(data)=>{
    return ({
        type:'SET_CATEGORY',
        payload:data
    })
}
export const getCategoryDetails=()=>{
    
    return (dispatch)=>{
        axios.get('http://127.0.0.1:3080/user/category',{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            const result=response.data
            dispatch(getCategory(result))
            dispatch(setIsLoading())
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

const createCategory=(category)=>{
    return ({
        type:'CREATE_CATEGORY',
        payload:category
    })
}
export const createCategoryDetails=(form)=>{
    
    return (dispatch)=>{
        axios.post('http://127.0.0.1:3080/user/category',form,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            const result=response.data
            console.log(result);
            if(result.hasOwnProperty('errors')){
                swal(result.errors.message,'','error');
                dispatch(setErrors(result))
            }
            else{
                dispatch(createCategory(result))
                dispatch(setErrors({}))
            }
            // 
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
}

const deleteCategory=(result)=>{
    return ({
        type:'DELETE_CATEGORY',
        payload:result
    })
}
export const deleteCategoryDetails=(id,deleteExpnses)=>{
    
    return (dispatch)=>{
        axios.delete(`http://127.0.0.1:3080/user/category/${id}`,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            const result=response.data
            if(result.hasOwnProperty('errors')){
                swal(result.errors.message,'','error');
                dispatch(setErrors(result))
            }
            else{
                dispatch(deleteCategory(result))
                deleteExpnses()
                swal('Deleted Successfully','','success')
            }
            
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
}

const editCategory=(result)=>{
    return({
        type:'EDIT_CATRGORY',
        payload:result
    })
}
export const editCategoryDetails=(id,body,handlModaleClose)=>{
    
    
    return (dispatch)=>{
        axios.put(`http://127.0.0.1:3080/user/category/${id}`,body,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response=>{
            const result=response.data
            console.log(result);
            if(result.hasOwnProperty('errors')){
                swal(result.errors.message,'','error');
                dispatch(setErrors(result))
            }
            else{
                dispatch(editCategory(result))
                handlModaleClose()
                swal('Updated Successfully','','success')
                
            }
            
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
}