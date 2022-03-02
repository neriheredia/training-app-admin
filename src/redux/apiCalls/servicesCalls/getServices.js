import {
    getAllServicesStart,
    getAllServicesSuccess,
    getAllServicesFailure,
} from '../../reducers/servicesReducer'
import { baseUrlDev } from '../../../config/requestMethod/publicRequest'

//GET ALL SERVICES
export const getAllServices = async (dispatch, token) => {
    dispatch(getAllServicesStart())
    try {
        const res = await baseUrlDev.get('admin/products', {
            headers: {
                token: token
            }
        })
        dispatch(getAllServicesSuccess(res.data))
    } catch (err) {
        dispatch(getAllServicesFailure())
    }
}