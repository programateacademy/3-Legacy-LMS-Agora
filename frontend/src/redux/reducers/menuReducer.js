import ACTIONS from '../actions/'

const initialState = {
    menuView:true
}

const menuReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.VIEW_MENU:
            return{
                ...state,
                menuView: false
            }
        case ACTIONS.HIDE_MENU:
            return{
                ...state,
                menuView:true
            }
            default:
                return state
    }
}

export default menuReducer
