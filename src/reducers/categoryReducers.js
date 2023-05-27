const initialState = {
    data: [],
    error: {}
}

const categoryReducers = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CATEGORY_ERROR': {
            return { ...state, error: action.payload }
        }
        case 'SET_CATEGORY': {
            return { ...state, data: action.payload }
        }
        case 'CREATE_CATEGORY': {
            return { ...state, data: [...state.data, action.payload] }
        }
        case 'DELETE_CATEGORY': {
            return { ...state, data: state.data.filter(ele => { return ele._id !== action.payload._id }) }
        }
        case 'EDIT_CATRGORY': {
            return {
                ...state, data: state.data.map(ele => {
                    if (ele._id === action.payload._id) {
                        return { ...ele, categoryName: action.payload.categoryName }
                    }
                    else{
                        return {...ele}
                    }
                })
            }
        }
        default: {
            return { ...state }
        }
    }
}

export default categoryReducers