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
import NutritionistsGraph from "./pages/analytics/Nutritionists";
import TrainersGraph from "./pages/analytics/Trainers";
import TransactionsGraph from "./pages/analytics/Transactions";
// import Product from "./pages/product/Product";
// import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";


function App() {
    // const admin = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.isAdmin
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
                            <Route path="/analytics/transactions">
                                <TransactionsGraph />
                            </Route>
                            <Route path="/analytics/allUsers">
                                <AllUsersGraph />
                            </Route>
                            <Route path="/analytics/trainers">
                                <TrainersGraph />
                            </Route>
                            <Route path="/analytics/nutritionists">
                                <NutritionistsGraph />
                            </Route>
                            {/* <Route path="/product/:productId">
                                <Product />
                            </Route>
                            <Route path="/newproduct">
                                <NewProduct />
                            </Route> */}
                        </div>
                    </>
                )}
            </Switch>
        </Router>
    );
}

export default App;
