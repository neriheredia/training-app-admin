import React from 'react';
import "./topbar.css";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../../redux/reducers/userLoginReducer'

export default function Topbar() {
    const dispatch = useDispatch()
    // const user = useSelector(state => state.user.currentUser)
    const history = useHistory()
    // console.log(user);

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logoutUser())
        // history.push('/login')
    }

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">TRAINING APP</span>
                </div>
                <div className="topRight">
                    <img src={"https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" className="topAvatar" />
                    <div className="profile">
                        <div className="options">
                            <span onClick={(e) => handleLogout(e)} >Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
