import React, {useState} from 'react'
import apiAgora from '../../../api'
import {useParams} from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from '../../../utils/notification'
import {isLength, isMatch} from '../../../utils/validation'
import './ResetPassword.css'
import { Input } from '../../../components/input/Input'
import logo from '../../../assets/logos/programateLogo.png'
import { useSelector } from "react-redux";

const initialState = {
    oldPassword:'',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

export function ResetPassword() {
    const [data, setData] = useState(initialState)
    const auth = useSelector((state) => state.auth);
    const userID = auth.user.id;


    const {password, cf_password, oldPassword, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }


    const handleResetPass = async () => {
        if(isLength(password))
            return setData({...data, err: "La contraseña debe tener al menos 6 caracteres", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Las contraseñas no coinciden.", success: ''})
        
        try {
            const res = await apiAgora.post('/api/reset', {password,oldPassword,userID}, {
                headers: {Authorization:"623b2f6c8cb9795f96b60dc2" }
            })
            showSuccessMsg( res.data.msg)
            setData({...data, err: "", success: res.data.msg})
        } catch (err) {
            showErrMsg(err.response.data.msg)
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
        
    }
    return (
        <div className="container-main-resetPassword">
            <div className="container-resetPassword">
            <img className="logo" src={logo} alt="logo" />
            <h2 className="title-resetPassword">RESTABLECER CONTRASEÑA</h2>
            <div className="container-info-resetPassword">
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
            {/*-------prueba --------- */}
                <Input
                type="password"
                label='Contraseña actual'
                placeholder="******"
                name='oldPassword'
                value={oldPassword}
                onChange={handleChangeInput} />
            {/*-------prueba --------- */}
                <Input
                type="password"
                label='Nueva Contraseña'
                placeholder="******"
                name='password'
                value={password}
                onChange={handleChangeInput} />
                <Input
                type="password"
                 label='Confirmar contraseña'
                 placeholder="******"
                 name='cf_password'
                 value={cf_password}
                 onChange={handleChangeInput} />
                <button className="button-resetPassword" onClick={handleResetPass}>Reset Password</button>
            </div>
            </div>
        </div>
    )
}

