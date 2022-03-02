import {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure
} from "../../reducers/userReducer"
import { privateRequest } from '../../../config/requestMethod/privateRequest'


//GET USERS
export const getAllUsers = async (dispatch) => {
    dispatch(getUsersStart())
    try {
        const res = await privateRequest.get('admin/users')
        dispatch(getUsersSuccess(res.data))
    } catch (err) {
        dispatch(getUsersFailure())
    }
}