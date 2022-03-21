import ACTIONS from './index'
import apiAgora from '../../api'

export const fetchAllDeliveries = async (token) => {
    const res = await apiAgora.get('/api/agora/get-deliveries', {
        headers: {Authorization: token}
    })
    return res
}


export const dispatchGetAllDeliveries = (res) => {
    return {
        type: ACTIONS.GET_DELIVERIES_BY_STUDENT,
        payload: res.data
    }
}

export const fetchDeliveriesByStudent = async (token, id_user) => {
    const res = await apiAgora.get(`/api/agora/get-deliverie-student/${id_user}`,{
        headers: {Authorization: token}
    })
    return res
}


export const dispatchGetDeliveriesByStudent = (res) => {
    return {
        type: ACTIONS.GET_DELIVERIES_BY_STUDENT,
        payload: res.data
    }
}

