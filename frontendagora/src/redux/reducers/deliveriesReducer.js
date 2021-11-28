import ACTIONS from '../actions/'

const deliveries = []

const deliveriesReducer = (state = deliveries, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_DELIVERIES:
            return action.payload
        case ACTIONS.GET_DELIVERIES_BY_STUDENT:
            return action.payload
        default:
            return state
    }
}

export default deliveriesReducer

    