import {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure
} from "../../reducers/userReducer"
import { baseUrlDev } from '../../../config/requestMethod/publicRequest'


//GET USERS
export const getAllUsers = async (dispatch, token) => {
    dispatch(getUsersStart())
    try {
        const res = await baseUrlDev.get('admin/users', {
            headers: {
                token: token
            }
        })
        dispatch(getUsersSuccess(res.data))
    } catch (err) {
        dispatch(getUsersFailure())
    }
}