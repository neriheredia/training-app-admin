import React from 'react';
import "./topbar.css";
import { NotificationsNone, Language, Settings } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logout } from '../../redux/userRedux';
import { useHistory } from 'react-router-dom';


export default function Topbar() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.currentUser)
    const history = useHistory()
    // console.log(user);

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout(user))
        history.push('/login')
    }

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">ECOMERCE</span>
                </div>
                <div className="topRight">
                    <img src={user.profilePic || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" className="topAvatar" />
                    <div className="profile">
                        <div className="options">
                            <span>Settings</span>
                            <span onClick={(e) => handleLogout(e)} >Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
