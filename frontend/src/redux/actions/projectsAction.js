import ACTIONS from './index'
import apiAgora from '../../api'

export const fetchAllProjects = async (token) => {
    const res = await apiAgora.get('/api/agora/get-projects', {
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

