import ACTIONS from './index'
import axios from 'axios'

export const fetchAllUsers = async (token) => {
    const res = await axios.get('/api/all_info', {
        headers: {Authorization: token}
    })
    return res
}

export const fetchAllStudents = async (token) => {
    const res = await axios.get('/api/all_students', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetAllUsers = (res) => {
    return {
        type: ACTIONS.GET_ALL_USERS,
        payload: res.data
    }
}

export const dispatchGetAllStudents = (res) => {
    return {
        type: ACTIONS.GET_ALL_STUDENTS,
        payload: res.data
    }
}