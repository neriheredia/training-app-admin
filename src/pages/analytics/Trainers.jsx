import Chart from "../../components/chart/Chart";
import "./analytics.css";
import ModularUserList from "../../components/modularUserList/modularUserList"


export default function TrainersGraph() {

    return (
        <div className="analytics">
            <Chart title="Personal Trainers" grid dataKey="Active Trainers" type={'trainers'} />
            <ModularUserList type='trainer'/>
        </div>
    );
}