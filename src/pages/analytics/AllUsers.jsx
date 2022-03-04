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
                />
            </div>
            <div>
                <Chart
                    title="Total Trainers"
                    grid dataKey="Active Users"
                    type={'trainers'}
                />
            </div>
            <div>
                <Chart
                    title="Total Nutritionists"
                    grid dataKey="Active Users"
                    type={'nutritionists'}
                />
            </div>
            <div>
                <Chart
                    title="Total Transactions"
                    grid dataKey="Active Users"
                    type={'transactions'}
                />
            </div>
        </div>
    );
}