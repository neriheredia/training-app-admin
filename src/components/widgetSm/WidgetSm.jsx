import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../redux/apiCalls/usersCalls/getUsersAll";
import { useDispatch, useSelector } from 'react-redux'

export default function WidgetSm() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)
    const token = useSelector(state => state.user.currentUser.accessToken)

    useEffect(() => {
        getAllUsers(dispatch, token)
    }, [])

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {users.map(user => (
                    <li className="widgetSmListItem" key={user.id}>
                        <img
                            src={user.profile_img ||
                                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                            alt=""
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">{user.username}</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                )).reverse()}
            </ul>
        </div>
    );
}