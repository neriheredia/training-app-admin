import {
    getTransactionStart,
    getTransactionSuccess,
    getTransactionFailure,
} from "../../reducers/transactionReducer"
import { privateRequest } from '../../../config/requestMethod/privateRequest'


//GET USERS
export const getAllTransactions = async (dispatch) => {
    dispatch(getTransactionStart())
    try {
        const res = await privateRequest.get('admin/orders')
        dispatch(getTransactionSuccess(res.data))
    } catch (err) {
        dispatch(getTransactionFailure())
    }
}