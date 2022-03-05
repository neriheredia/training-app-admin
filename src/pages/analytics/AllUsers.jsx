import Chart from "../../components/chart/Chart";
import "./analytics.css";


export default function AllUsersGraph() {
    return (
        <div className="analytics">
            <div>
                <Chart
                    title="Total Users"
                    grid dataKey="Active Users"
                    type={'users'}
                    table
                /> 
            </div>
            <div>
                <Chart
                    title="Total Trainers"
                    grid dataKey="Active Trainers"
                    type={'trainers'}
                    table
                />
            </div>
            <div>
                <Chart
                    title="Total Nutritionists"
                    grid dataKey="Active Nutritionists"
                    type={'nutritionists'}
                    table
                />
            </div>
            <div>
                <Chart
                    title="Total Transactions"
                    grid dataKey="Total Transactions"
                    type={'transactions'}
                    table
                />
            </div>
        </div>
    );
}