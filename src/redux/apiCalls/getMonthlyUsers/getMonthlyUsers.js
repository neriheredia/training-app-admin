import {
    getMonthlyStatsStart,
    getMonthlyStatsSuccess,
    getMonthlyStatsFailure
} from "../../reducers/monthlyReducer"
import { baseUrlDev } from '../../../config/requestMethod/publicRequest'


//GET MONTHLY STATS
export const getMonthlyStats = async (dispatch, type, token) => {
    dispatch(getMonthlyStatsStart())
    try {
        const res = await baseUrlDev.get(`admin/stats/${type}`, {
            headers: {
                token: token
            }
        })
        dispatch(getMonthlyStatsSuccess(res.data))
    } catch (err) {
        dispatch(getMonthlyStatsFailure())
    }
}