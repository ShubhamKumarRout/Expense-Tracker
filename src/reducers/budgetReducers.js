const initialState = {
    data: {},
    error: {}
}

const budgetReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'SET_BUDGET_ERROR': {
            return { ...state, error: action.payload }
        }
        case 'SET_BUDGET': {
            return { ...state, data: action.payload }
        }
        case    'UPDATE_BUDGET':{
            return { ...state, data: action.payload }
        }
        default: {
            return state;
        }
    }

}

export default budgetReducer