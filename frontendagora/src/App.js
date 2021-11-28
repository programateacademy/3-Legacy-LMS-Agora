import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  dispatchGetUser,
  dispatchLogin,
  fetchUser
} from './redux/actions/authAction'
import Unification from './Unification'
import { dispatchGetAllStudents, fetchAllStudents } from './redux/actions/usersAction'
import { dispatchGetAllProjects, fetchAllProjects } from './redux/actions/projectsAction'
import { dispatchGetAllDeliveries, dispatchGetDeliveriesByStudent, fetchAllDeliveries, fetchDeliveriesByStudent } from './redux/actions/deliveriesAction'
import { dispatchGetAllAnnucies, fetchAllAnunncies } from './redux/actions/annunciesAction'


function App () {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)

  const id_user = auth.user.id

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAgoraUser')
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin && loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const refreshtoken = user.refresh_token

      const getToken = async () => {
        const res = await axios.post(
          '/api/refresh_token',
          { refreshtoken }
        )
        dispatch({ type: 'GET_TOKEN', payload: res.data.access_token })
      }
      getToken()
    }
  }, [auth.isLogged, dispatch])

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin())
        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  }, [token, dispatch])

  useEffect(() => {
    if (auth.isTeacher) {
      fetchAllStudents(token).then(res => {
        dispatch(dispatchGetAllStudents(res))
      })
      fetchAllProjects(token).then(res => {
        dispatch(dispatchGetAllProjects(res))
      })
      fetchAllDeliveries(token).then(res => {
        dispatch(dispatchGetAllDeliveries(res))
      })
      fetchAllAnunncies(token).then(res => {
        dispatch(dispatchGetAllAnnucies(res))
      })
    }
  }, [token, auth.isTeacher, dispatch])

  useEffect(() => {
      fetchAllProjects(token).then(res => {
        dispatch(dispatchGetAllProjects(res))
        
      })
      fetchDeliveriesByStudent(token, id_user ).then(res => {
        dispatch(dispatchGetDeliveriesByStudent(res))
      })
      fetchAllAnunncies(token).then(res => {
        dispatch(dispatchGetAllAnnucies(res))
      })
  }, [token, auth.isStudent, dispatch,id_user])

    

  return (
    <>
      
      <Unification />
    </>
  )
}

export default App
