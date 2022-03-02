import Chart from "../../components/chart/Chart";
import "./analytics.css";


export default function TransactionsGraph() {

    return (
        <div className="analytics">
            <Chart title="Transactions" grid dataKey="Transactions" type={'transactions'} />

        </div>
    );
}