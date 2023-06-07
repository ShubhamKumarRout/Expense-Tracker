import {createStore,combineReducers,applyMiddleware} from 'redux'

import thunk from 'redux-thunk'
import usersReducer from '../reducers/userReducers'
import budgetReducer from '../reducers/budgetReducers'
import categoryReducers from '../reducers/categoryReducers'
import expenseReducers from '../reducers/expenseReducers'
const configureStore=()=>{
    const store=createStore(combineReducers({
        user:usersReducer,
        budget:budgetReducer,
        category:categoryReducers,
        expense:expenseReducers
    }),applyMiddleware(thunk))
    return store
}

export default configureStore