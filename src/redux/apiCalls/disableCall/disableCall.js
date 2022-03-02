import { baseUrlDev } from '../../../config/requestMethod/publicRequest'


//DISABLE ANYTHING
export const Disable = async (id) => {
    await baseUrlDev.delete(`admin/${id}`)
}