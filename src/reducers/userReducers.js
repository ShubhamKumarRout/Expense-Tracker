const initialState={
    data:{},
    error:{}
}

const usersReducer=(state=initialState,action)=>{
    
    switch(action.type){

       case 'REGISTER_USER':{
        return {...state, isRegistered:true}
       }

       case 'SET_ERRORS':{
        return {...state,error:action.payload}
       }

       case 'SET_USER_INFO':{
        return {...state,data:action.payload}
       }
        default :{
            return {...state}
        }
    }
}

export default usersReducer