import ACTIONS from './index'
import apiAgora from '../../api/index'

export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}

export const fetchUser = async (token) => {
    const res = await apiAgora.get('/api/info', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data,
            isSuperAdmin: res.data.role === 3? true : false,
            isAdmin: res.data.role === 2? true : false,
            isStudent: res.data.role === 0 ? true : false,
            isTeacher: res.data.role === 1 ? true : false
        }
    }
}