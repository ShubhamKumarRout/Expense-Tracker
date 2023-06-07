const initialState={
    data:[],
    isLoading:true,
    errors:{}
}

const expenseReducers=(state=initialState,action)=>{
    switch(action.type){
        case 'SET_EXPENSE_ERROR':{
            return {...state,errors:action.payload}
        }
        case 'SET_EXPENSE_IS_LOADING':{
            return {...state,isLoading:false}
        }
        case 'SET_EXPENSE':{
            return {...state,data:action.payload}
        }
        case 'CREATE_EXPENSE': {
            return { ...state, data: [...state.data, action.payload] }
        }
        case 'UPDATE_EXPENSE': {
            return { 
                ...state, data: state.data.map(ele => {
                    if (ele._id === action.payload._id) {
                        return { ...ele, ...action.payload }
                    }
                    else{
                        return {...ele}
                    }
                })
            }
        }
        case 'DELETE_EXPENSE':{
            return {...state,data:state.data.filter(ele=>ele._id !== action.payload._id)}
        }
        default:{
            return {...state}
        }
    }


}

export default expenseReducers