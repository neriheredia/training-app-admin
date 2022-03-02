import Chart from "../../components/chart/Chart";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import {  useMemo, useState } from "react";
import { useEffect } from "react";


// import { userRequest } from '../../requestMethods'

export default function Home() {
    const [userState, setUserState] = useState([])

    // const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken
    // console.log(TOKEN);
    return (
        <div className="home">
            <Chart title="User Analytics" grid dataKey="Active users" />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    );
}