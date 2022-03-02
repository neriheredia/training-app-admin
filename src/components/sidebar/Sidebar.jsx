import "./sidebar.css";
import {
    Add,
    Assignment,
    LineStyle,
    PermIdentity,
    TrendingUp
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" className="link">
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon" />
                                Home
                            </li>
                        </Link>
                        <Link to="/analytics" className="link">
                            <li className="sidebarListItem active">
                                <TrendingUp className="sidebarIcon" />
                                Analytics
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Users Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/users" className="link">
                            <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon" />
                                Users
                            </li>
                        </Link>
                        <Link to="/newUser" className="link">
                            <li className="sidebarListItem">
                                <Add className="sidebarIcon" />
                                Add User
                            </li>
                        </Link>

                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Services Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/services" className="link" >
                            <li className="sidebarListItem">
                                <Assignment className="sidebarIcon" />
                                Services
                            </li>
                        </Link>
                        {/* <Link to="/newproduct" className="link" >
                            <li className="sidebarListItem">
                                <Add className="sidebarIcon" />
                                
                            </li>
                        </Link> */}
                    </ul>
                </div>
            </div>
        </div>
    );
}