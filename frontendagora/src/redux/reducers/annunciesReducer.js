import ACTIONS from '../actions/'

const annuncies = []

const annunciesReducer = (state = annuncies, action) => {
    switch(action.type){
        case ACTIONS.GET_ANNUNCIES:
            return action.payload

        default:
            return state
    }
}

export default annunciesReducer

    