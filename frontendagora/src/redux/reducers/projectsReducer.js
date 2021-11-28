import ACTIONS from '../actions/'

const projects = []

const projectsReducer = (state = projects, action) => {
    switch(action.type){
        case ACTIONS.GET_ALL_PROJECTS:
            return action.payload

        default:
            return state
    }
}

export default projectsReducer

    