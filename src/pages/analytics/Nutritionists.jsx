import Chart from "../../components/chart/Chart";
import "./analytics.css";


export default function NutritionistsGraph() {

    return (
        <div className="analytics">
            <Chart title="Nutritionists" grid dataKey="Active Nutritionists" type={'nutritionists'} />
        </div>
    );
}