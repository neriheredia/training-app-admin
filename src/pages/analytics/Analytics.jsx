import Chart from "../../components/chart/Chart";
import "./analytics.css";
import { useMemo, useState } from "react";
import { useEffect } from "react";


// import { userRequest } from '../../requestMethods'

export default function Analytics() {
    const [userState, setUserState] = useState([])

    // const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken
    // console.log(TOKEN);
    return (
        <div className="analytics">
            <Chart title="Transactions" grid dataKey="Transactions" type={'transactions'} />
            <Chart title="Total Users" grid dataKey="Active Users" type={'users'} />
            <Chart title="Personal Trainers" grid dataKey="Active Trainers" type={'trainers'} />
            <Chart title="Nutritionists" grid dataKey="Active Nutritionists" type={'nutritionists'} />
        </div>
    );
}