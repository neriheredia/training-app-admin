import Chart from "../../components/chart/Chart";
import "./analytics.css";


export default function AllUsersGraph() {
    return (
        <div className="analytics">
            <Chart
                title="Total Users"
                grid dataKey="Active Users"
                type={'users'}
            />
            <Chart
                title="Total Trainers"
                grid dataKey="Active Users"
                type={'trainers'}
            />
            <Chart
                title="Total Nutritionists"
                grid dataKey="Active Users"
                type={'nutritionists'}
            />
            <Chart
                title="Total Transactions"
                grid dataKey="Active Users"
                type={'transactions'}
            />
        </div>
    );
}