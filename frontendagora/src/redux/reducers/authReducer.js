import ACTIONS from '../actions/'

const initialState = {
    user: [],
    isLogged: false,
    isAdmin: false, 
    isStudent: false,
    isTeacher: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
            return {
                ...state,
                isLogged: true
            }
        case ACTIONS.GET_USER:
            return {
                ...state,
                user: action.payload.user,
                isAdmin: action.payload.isAdmin,
                isStudent: action.payload.isStudent,
                isTeacher: action.payload.isTeacher
            }
        default:
            return state
    }
}

export default authReducer