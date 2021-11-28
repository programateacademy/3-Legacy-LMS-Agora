import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../../utils/notification'
import { isEmpty, isEmail, isLength, isMatch,isLengthcontactNumber } from '../../../utils/validation'
import './Register.css'
import { Input } from '../../../componentes/input/Input'
import logo from '../../../assets/logos/programateLogo.png'

const initialState = {
  name: '',
  middleName: '',
  lastName: '',
  secondSurname: '',
  telefono: '',
  email: '',
  password: '',
  cf_password: '',
  err: '',
  success: ''
}

function Register () {
  const [user, setUser] = useState(initialState)
  const auth = useSelector(state => state.auth)
  const {
    name,
    middleName,
    lastName,
    secondSurname,
    contactNumber,
    email,
    password,
    cf_password,
    err,
    success
  } = user

  const handleChangeInput = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value, err: '', success: '' })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (isEmpty(name) || isEmpty(password))
      return setUser({
        ...user,
        err: 'Todos los campos son obligatorios',
        success: ''
      })
    if (isEmpty(middleName) || isEmpty(password))
      return setUser({
        ...user,
        err: 'Todos los campos son obligatorios',
        success: ''
      })
    if (isEmpty(lastName) || isEmpty(password))
      return setUser({
        ...user,
        err: 'Todos los campos son obligatorios',
        success: ''
      })
    if (isEmpty(secondSurname) || isEmpty(password))
      return setUser({
        ...user,
        err: 'Todos los campos son obligatorios',
        success: ''
      })

    if (!isEmail(email))
      return setUser({
        ...user,
        err: 'Este correo electronico ya existe :(',
        success: ''
      })

    if (isLengthcontactNumber(contactNumber))
      return setUser({
        ...user,
        err: 'El telefono debe tener al menos 10 caracteres',
        success: ''
      })

    if (isLength(password))
      return setUser({
        ...user,
        err: 'La contraseña debe tener al menos 6 caracteres',
        success: ''
      })

    if (!isMatch(password, cf_password))
      return setUser({
        ...user,
        err: 'Las contraseñas no coinciden',
        success: ''
      })

    try {
      const res = await axios.post('/api/register', {
        name,
        middleName,
        lastName,
        secondSurname,
        contactNumber,
        email,
        password
      })
      showSuccessMsg(success)
      setUser({ ...user, err: '', success: res.data.msg })
    } catch (err) {
      showErrMsg(err.response.data.msg)
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: '' })
    }
  }

  return (
    <div className='container-register'>
      <div className='container-register-page'>
        <img className='logo-register' src={logo} alt='logo' />
        <h2 className='title-register'>REGISTRATE</h2>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <div className='register-form-content'>
          <form className='register-form' onSubmit={handleSubmit}>
            <div className='container-register-input'>
              <Input className="input-register"
                label='Primer nombre'
                placeholder='Juan'
                name='name'
                value={name}
                onChange={handleChangeInput}
              />
              <Input className="input-register"
                label='Segundo nombre'
                placeholder='David'
                name='middleName'
                value={middleName}
                onChange={handleChangeInput}
              />
            </div>
            <div className='container-register-input'>
              <Input className="input-register"
                label='Primer apellido'
                placeholder='Perez'
                name='lastName'
                value={lastName}
                onChange={handleChangeInput}
              />
              <Input className="input-register"
                label='Segundo apellido'
                placeholder='Diaz'
                name='secondSurname'
                value={secondSurname}
                onChange={handleChangeInput}
              />
            </div>
            <div className='container-register-input'>
              <Input className="input-register"
                label='Correo'
                placeholder='Luis@hotmail.com'
                name='email'
                value={email}
                onChange={handleChangeInput}
              />
              <Input className="input-register"
              type="password"
                label='Contraseña'
                placeholder='******'
                name='password'
                value={password}
                onChange={handleChangeInput}
              />
            </div>
            <div className='container-register-input'>
              <Input className="input-register"
              type="password"
                label='Confirmar contraseña'
                placeholder='******'
                name='cf_password'
                value={cf_password}
                onChange={handleChangeInput}
              />
              <Input className="input-register"
                label='Telefono'
                placeholder='+57 313 300 300'
                name='contactNumber'
                value={contactNumber}
                onChange={handleChangeInput}
              />
            </div>
            {/* <div className='container-register-input'>
              <label>Ingresa una imagen</label>
              <button className='button-submit-photo' type='submit'>
                Escoger un archivo
              </button>
            </div> */}
            {auth.isAdmin ? (
              <div>
                <select name='select'>
                  <option value='Administrador'>Administrador</option>
                  <option value='Estudiante' selected>
                    Estudiante
                  </option>
                  <option value='Formador'>Formador</option>
                </select>
              </div>
            ) : (
              ''
            )}
            <button className='button-submit-register' type='submit'>
              CREAR CUENTA
            </button>
            {auth.isAdmin ? (
              ''
            ) : (
              <p className='link-register'>
                Ya tienes cuenta?{' '}
                <Link className='link-register' to='/login'>
                  Login
                </Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
