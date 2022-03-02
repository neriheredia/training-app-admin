import Chart from "../../components/chart/Chart";
import "./analytics.css";


export default function AllUsersGraph() {

    return (
        <div className="analytics">
            <Chart title="Total Users" grid dataKey="Active Users" type={'users'} />
        </div>
    );
}