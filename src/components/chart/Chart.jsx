import "./chart.css";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useEffect } from "react";
import { getMonthlyStats } from "../../redux/apiCalls/getMonthlyStats/getMonthlyStats";
import { useDispatch, useSelector } from 'react-redux'
import WidgetLg from "../../components/widgetLg/WidgetLg";

export default function Chart({ title, dataKey, grid, type, table }) {

    const dispatch = useDispatch()
    const stats = useSelector(state => {
        if(type==='users') return state.userStats.stats
        if(type==='trainers') return state.trainerStats.stats
        if(type==='nutritionists') return state.nutritionistStats.stats
        return state.transactionStats.stats
    })
    const token = useSelector(state => state.user.currentUser.accessToken)

    let height = Math.max(...Object.values(stats))
    let width = Object.keys(stats).length


    let data = []
    for (let [key, value] of Object.entries(stats)) {
        data.push({ month: key, [dataKey]: value })
    }

    useEffect(() => {
        getMonthlyStats(dispatch, type, token)
    }, [dispatch])

    return (
        <div className="chart">
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data} height={height * 1.1} width={width * 1.1} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <XAxis dataKey="month" stroke="#5550bd" />
                    <YAxis />
                    <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
                    <Tooltip />
                    {grid && <CartesianGrid stroke="#e0dfdfbe" strokeDasharray="5 5" />}
                </LineChart>
            </ResponsiveContainer>
            {table?<WidgetLg type={type}/>:null}
        </div>
    );
}