import Chart from "../../components/chart/Chart";
import "./analytics.css";
import ModularUserList from "../../components/modularUserList/modularUserList"


export default function NutritionistsGraph() {

    return (
        <div className="analytics">
            <Chart title="Nutritionists" grid dataKey="Active Nutritionists" type={'nutritionists'} />
            <ModularUserList type='nutritionist'/>
        </div>
    );
}