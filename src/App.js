import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ServicesList from "./pages/servicesList/ServicesList";
import TransactionsList from './pages/transactionsList/TransactionsList'
import AllUsersGraph from "./pages/analytics/AllUsers";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";


function App() {
    const user = useSelector(state => state.user.currentUser)
    return (
        <Router>
            <Switch>
                {!user ? (
                    <Route path="/">
                        <Login />
                    </Route>
                ) : (
                    <>
                        <Topbar />
                        <div className="container">
                            <Sidebar />
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/users">
                                <UserList />
                            </Route>
                            <Route path="/user/:userId">
                                <User />
                            </Route>
                            <Route path="/newUser">
                                <NewUser />
                            </Route>
                            <Route path="/services">
                                <ServicesList />
                            </Route>
                            <Route path="/transactions">
                                <TransactionsList />
                            </Route>
                            <Route path="/analytics">
                                <AllUsersGraph />
                            </Route>
                        </div>
                    </>
                )}
            </Switch>
        </Router>
    );
}

export default App;
