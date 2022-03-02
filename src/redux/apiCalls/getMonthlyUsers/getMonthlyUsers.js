import {
    getMonthlyStatsStart,
    getMonthlyStatsSuccess,
    getMonthlyStatsFailure
} from "../../reducers/monthlyReducer"
import { privateRequest } from '../../../config/requestMethod/privateRequest'


//GET MONTHLY STATS
export const getMonthlyStats = async (dispatch) => {
    dispatch(getMonthlyStatsStart())
    try {
        const res = await privateRequest.get('admin/monthlyUsers')
        dispatch(getMonthlyStatsSuccess(res.data))
    } catch (err) {
        dispatch(getMonthlyStatsFailure())
    }
}