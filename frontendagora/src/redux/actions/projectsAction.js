import ACTIONS from './index'
import axios from 'axios'

export const fetchAllProjects = async (token) => {
    const res = await axios.get('/api/agora/get-projects', {
        headers: {Authorization: token}
    })
    return res
}


export const dispatchGetAllProjects = (res) => {
    return {
        type: ACTIONS.GET_ALL_PROJECTS,
        payload: res.data
    }
}

