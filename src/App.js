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
import Swal from 'sweetalert2'
import { useEffect } from "react";


function App() {
    let user = useSelector(state => state.user.currentUser)

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    useEffect(()=>{
        if(user?.isAdmin===false){
            Toast.fire({
                icon: 'info',
                title: 'This user isn\'t an admin'
            })
        }
    },[user])


    return (
        <Router>
            <Switch>
                {!user||user.isAdmin===false ? (
                    <Route path="/">
                        <Login />
                    </Route>
                ) : (
                    user?.isAdmin ?
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
                    </>:null
                )}
            </Switch>
        </Router>
    );
}

export default App;
