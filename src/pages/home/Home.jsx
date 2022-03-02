import Chart from "../../components/chart/Chart";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import {  useMemo, useState } from "react";
// import { userRequest } from '../../requestMethods'

export default function Home() {
    const [userState, setUserState] = useState([])
    // const MONTHS = useMemo(
    //     () => [
    //         "Jan",
    //         "Feb",
    //         "Mar",
    //         "Apr",
    //         "May",
    //         "Jun",
    //         "Jul",
    //         "Agu",
    //         "Sep",
    //         "Oct",
    //         "Nov",
    //         "Dec",
    //     ], []
    // )

    // useEffect(() => {
    //     const getStats = async () => {
    //         try {
    //             const res = await userRequest.get('users/stats')
    //             res.data.map((item) =>
    //                 setUserState((prev) => [
    //                     ...prev,
    //                     { name: MONTHS[item._id - 1], "Active User": item.total }
    //                 ])
    //             )
    //         } catch { }
    //     }
    //     getStats()
    // }, [MONTHS])

    // const TOKEN = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser.accessToken
    // console.log(TOKEN);
    return (
        <div className="home">
            <Chart data={userState} title="User Analytics" grid dataKey="Active User" />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    );
}