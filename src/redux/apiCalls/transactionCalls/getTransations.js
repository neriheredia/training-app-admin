import {
    getTransactionStart,
    getTransactionSuccess,
    getTransactionFailure,
} from "../../reducers/transactionReducer"
import { baseUrlDev } from '../../../config/requestMethod/publicRequest'


//GET USERS
export const getAllTransactions = async (dispatch, accessToken) => {
    dispatch(getTransactionStart())
    try {
        const res = await baseUrlDev.get('admin/orders', {
            headers: {
                token: `${accessToken}`
            }
        })
        dispatch(getTransactionSuccess(res.data))
    } catch (err) {
        dispatch(getTransactionFailure())
    }
}