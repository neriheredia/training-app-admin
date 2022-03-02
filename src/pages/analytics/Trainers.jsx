import Chart from "../../components/chart/Chart";
import "./analytics.css";


export default function TrainersGraph() {

    return (
        <div className="analytics">
            <Chart title="Personal Trainers" grid dataKey="Active Trainers" type={'trainers'} />
        </div>
    );
}