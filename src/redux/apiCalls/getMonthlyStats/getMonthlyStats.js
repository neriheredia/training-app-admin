import {
    getNutritionistsStatsStart,
    getNutritionistsStatsSuccess,
    getNutritionistsStatsFailure
} from "../../reducers/nutritionistStats"
import {
    getTrainerStatsStart,
    getTrainerStatsSuccess,
    getTrainerStatsFailure
} from '../../reducers/trainerStats'
import {
    getUserStatsStart,
    getUserStatsSuccess,
    getUserStatsFailure
} from '../../reducers/userStats'
import {
    getTransactionStatsStart,
    getTransactionStatsSuccess,
    getTransactionStatsFailure
} from '../../reducers/transactionStats'
import { baseUrlDev } from '../../../config/requestMethod/publicRequest'


//GET MONTHLY STATS
export const getMonthlyStats = async (dispatch, type, token) => {
    dispatch(type==='users'?getUserStatsStart():type==='trainers'?getTrainerStatsStart():type==='nutritionists'?getNutritionistsStatsStart():getTransactionStatsStart())
    try {
        const res = await baseUrlDev.get(`admin/stats/${type}`, {
            headers: {
                token: token
            }
        })
        dispatch(type==='users'?getUserStatsSuccess(res.data):type==='trainers'?getTrainerStatsSuccess(res.data):type==='nutritionists'?getNutritionistsStatsSuccess(res.data):getTransactionStatsSuccess(res.data))
    } catch (err) {
        dispatch(type==='users'?getUserStatsFailure():type==='trainers'?getTrainerStatsFailure():type==='nutritionists'?getNutritionistsStatsFailure():getTransactionStatsFailure())
    }
}