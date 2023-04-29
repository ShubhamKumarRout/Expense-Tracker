import {createStore,combineReducers,applyMiddleware} from 'redux'

import thunk from 'redux-thunk'
import usersReducer from '../reducers/userReducers'
const configureStore=()=>{
    const store=createStore(combineReducers({
        user:usersReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore