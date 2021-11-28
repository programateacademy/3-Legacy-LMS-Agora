import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { showSuccessMsg, showErrMsg } from '../../../utils/notification'
import { Input } from '../../../componentes/input/Input'
import './EditUser.css'

function EditUser () {
  const { id } = useParams()
  const navigate = useNavigate()
  const [editUser, setEditUser] = useState([])
  const users = useSelector(state => state.users)
  const token = useSelector(state => state.token)
  const [checkAdmin, setCheckAdmin] = useState(false)
  const [err, setErr] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (users.length !== 0) {
      users.forEach(user => {
        if (user.id === id) {
          setEditUser(user)
          setCheckAdmin(user.role === 1 ? true : false)
        }
      })
    } else {
      navigate('/profile')
    }
  }, [users, id, navigate])

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `/api/update_role/${editUser.id}`,
        {
          role: checkAdmin ? 1 : 0
        },
        {
          headers: { Authorization: token }
        }
      )
      showSuccessMsg(res.data.msg)
      setSuccess(res.data.msg)
    } catch (err) {
      showErrMsg(err.res.data.msg)
      err.res.data.msg && setErr(err.res.data.msg)
    }
  }

  const handleCheck = () => {
    setSuccess('')
    setErr('')
    setCheckAdmin(!checkAdmin)
  }

  return (
    <>
      <div className='container-main-editUser'>
        <button onClick={() => navigate('/profile')} className='button-editUser-goBack'>
          <i className='fas fa-long-arrow-alt-left '></i> Regresar
        </button>
        <div className='container-info-editUser'>
          <h2 className='title-editUser'>EDITAR USUARIO</h2>
          <Input
            label='Name'
            placeholder='Luis'
            name='name'
            value={editUser.name}
            disabled
          />
          <Input
            label='Email'
            placeholder='Luis@hotmail.com'
            name='email'
            value={editUser.email}
            disabled
          />
          <input
            className='input-checkBox'
            type='checkbox'
            id='isAdmin'
            checked={checkAdmin}
            onChange={handleCheck}
          />
          <label htmlFor='isAdmin'>Administrador?</label>
          <button className='button-editUser-update' onClick={handleUpdate}>
            Actualizar
          </button>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
        </div>
      </div>
    </>
  )
}

export default EditUser
