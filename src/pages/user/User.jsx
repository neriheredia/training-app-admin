import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
} from "@material-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
// import { updateUser } from "../../redux/apiCalls";
import "./user.css";

export default function User() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [box, setBox] = useState(false)
    // const [error, setError] = useState(false);
    const history = useHistory()
    const location = useLocation()
    const userId = location.pathname.split('/')[2]
    const user = useSelector(state => state.users.users.filter(u => u.id === userId))
    const dispatch = useDispatch()


    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     let newUser = {
    //         id: user[0].id,
    //         username,
    //         email,
    //         password,
    //         isAdmin: box
    //     }
    //     try {
    //         updateUser(dispatch, newUser.id, newUser)
    //             .then(response => {
    //                 history.push('/users')
    //             })
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to="/newUser">
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src={user[0].profile_img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{user[0].username}</span>
                            <span className="userShowUserTitle">{user[0].email}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">{user[0].username}</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className="userShowIcon" />
                            <span className="userShowInfoTitle">{user[0].createdAt}</span>
                        </div>
                        <span className="userShowTitle">{user.isAdmin}</span>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">{user[0].email}</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon" />
                            <span className="userShowInfoTitle">{user[0].isAdmin === false ? 'NO' : 'YES'}</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm" >
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input
                                    type="text"
                                    placeholder={user[0].username}
                                    className="userUpdateInput"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Password </label>
                                <input
                                    type="password"
                                    placeholder="Passwrod..."
                                    className="userUpdateInput"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    type="text"
                                    placeholder={user[0].email}
                                    className="userUpdateInput"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="userUpdateBox">
                                <label>isAdmin</label>
                                <input
                                    type="checkbox"
                                    className="userUpdateBox"
                                    onChange={() => setBox(true)}
                                />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            {/* <div className="userUpdateUpload">
                                <img
                                    className="userUpdateImg"
                                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                    alt=""
                                />
                                <label htmlFor="file">
                                    <Publish className="userUpdateIcon" />
                                </label>
                                <input type="file" id="file" style={{ display: "none" }} />
                            </div> */}
                            <button className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}