import { baseUrlDev } from '../../../config/requestMethod/publicRequest'


//DISABLE ANYTHING
export const Disable = async (id, state) => {
    await baseUrlDev.delete(`admin/${id}`)
}