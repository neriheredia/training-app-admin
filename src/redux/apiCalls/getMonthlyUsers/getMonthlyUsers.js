import {
    getMonthlyStatsStart,
    getMonthlyStatsSuccess,
    getMonthlyStatsFailure
} from "../../reducers/monthlyReducer"
import { privateRequest } from '../../../config/requestMethod/privateRequest'


//GET MONTHLY STATS
export const getMonthlyStats = async (dispatch, type) => {
    dispatch(getMonthlyStatsStart())
    try {
        const res = await privateRequest.get(`admin/stats/${type}`)
        dispatch(getMonthlyStatsSuccess(res.data))
    } catch (err) {
        dispatch(getMonthlyStatsFailure())
    }
}