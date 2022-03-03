import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loginUser } from '../../redux/apiCalls/userLoginCall/userLoginCall'
import { logoutUser } from '../../redux/reducers/userLoginReducer'
import { useField } from '../../hooks/useField/useField'
import { useSelector } from 'react-redux'

const Login = () => {
    const username = useField({ type: 'text' })
    const password = useField({ type: 'password' })
    const [user, setUser] = useState({})

    const thisuser = useSelector(state=>state.user.currentUser)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{
        dispatch(logoutUser(thisuser))
    },[])

    useEffect(() => {
        setUser(prev => {
            return {
                ...prev,
                username: username.value,
                password: password.value
            }
        })
    }, [username.value, password.value])


    const handleClick = (e) => {
        e.preventDefault()
        loginUser(dispatch, user)
        history.push('/')
    }

    return (
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <input style={{ padding: "10px", marginBottom: "20px" }}
                {...username}
                placeholder='username'
            />
            <input style={{ padding: "10px", marginBottom: "20px" }}
                {...password}
                placeholder='password'
            />
            <button style={{ padding: "10px", width: 100 }} onClick={handleClick}>Login</button>
        </div>
    )
}

export default Login
