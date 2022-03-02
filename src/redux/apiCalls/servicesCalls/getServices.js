import {
    getAllServicesStart,
    getAllServicesSuccess,
    getAllServicesFailure,
} from '../../reducers/servicesReducer'
import { privateRequest } from '../../../config/requestMethod/privateRequest'

//GET ALL SERVICES
export const getAllServices = async (dispatch) => {
    dispatch(getAllServicesStart())
    try {
        const res = await privateRequest.get('admin/products')
        dispatch(getAllServicesSuccess(res.data))
    } catch (err) {
        dispatch(getAllServicesFailure())
    }
}