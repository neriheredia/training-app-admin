import { baseUrlDev } from '../../../config/requestMethod/publicRequest'

//DISABLE ANYTHING
export const Disable = async (id, token) => {
    await baseUrlDev.delete(`admin/${id}`,{
        headers: {
            token: token
        }
    })
}