import ACTIONS from './index'
import axios from 'axios'

export const fetchAllAnunncies = async (token) => {
    const res = await axios.get('/api/agora/get-announcies', {
        headers: {Authorization: token}
    })
    return res
}


export const dispatchGetAllAnnucies = (res) => {
    return {
        type: ACTIONS.GET_ANNUNCIES,
        payload: res.data
    }
}

