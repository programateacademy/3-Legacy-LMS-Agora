import apiAgora from '../../../api/index'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from '../../../utils/notification'
import { dispatchLogin } from '../../../redux/actions/authAction'
import { useDispatch } from 'react-redux'
import './Login.css'
import logo from '../../../assets/logos/Programate-academy-negros.png'
import LazyLoad from "react-lazy-load";

const initialState = {
  email: '',
  password: '',
  err: '',
  success: ''
}

function Login () {
  const [user, setUser] = useState(initialState) //Inicializo hooks
  const dispatch = useDispatch() //Inicializo hooks
  const navigate = useNavigate() //Inicializo hooks

  const { email, password, success } = user

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value, err: '', success: '' })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await apiAgora.post('/api/login', {
        email,
        password
      })
      setUser({ ...user, err: '', success: res.data.msg })
      window.localStorage.setItem('firstLogin', true)
      window.localStorage.setItem(
        'loggedAgoraUser', JSON.stringify(res.data)
      )
      showSuccessMsg(success)
      dispatch(dispatchLogin())
      navigate('/')
    } catch (err) {
      showErrMsg(err.response.data.error)
      err.response.data.error &&
        setUser({ ...user, err: err.response.data.error, success: '' })
    }
  }

  return (
    <div className='container-login'>
      <div className='login-page'>
        <LazyLoad>
          <img className='logo' src={logo} alt='logo' />
        </LazyLoad>
        <form className='form' onSubmit={handleSubmit}>
          <div className='login-form-content'>
            <h4>Correo Electronico</h4>
            <input
              placeholder='email@educamas.co'
              name='email'
              value={email}
              onChange={handleChangeInput}
            />
            <h4>Contraseña</h4>
            <input
              type='Password'
              placeholder='********'
              name='password'
              value={password}
              onChange={handleChangeInput}
            />
          </div>

          <button className='button-login' type='submit'>
            INGRESAR
          </button>
          <Link to='/forgot_password'>¿Olvidó su contraseña?</Link>
        </form>
      </div>
    </div>
  )
}

export default Login