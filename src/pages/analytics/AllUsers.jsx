import Chart from "../../components/chart/Chart";
import "./analytics.css";
import ModularUserList from "../../components/modularUserList/modularUserList"


export default function AllUsersGraph() {

    return (
        <div className="analytics">
            <Chart title="Total Users" grid dataKey="Active Users" type={'users'} />
            <ModularUserList type='user'/>
        </div>
    );
}