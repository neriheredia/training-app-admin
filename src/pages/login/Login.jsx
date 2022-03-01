import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../../redux/apiCalls'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()


    const handleClick = (e) => {
        e.preventDefault()
        login(dispatch, { username, password })
        // window.location.href('/')
        history.push('/')
    }

    return (
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <input style={{ padding: "10px", marginBottom: "20px" }} type="text" placeholder='username' onChange={e => setUsername(e.target.value)} />
            <input style={{ padding: "10px", marginBottom: "20px" }} type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
            <button style={{ padding: "10px", width: 100 }} onClick={handleClick}>Login</button>
        </div>
    )
}

export default Login
