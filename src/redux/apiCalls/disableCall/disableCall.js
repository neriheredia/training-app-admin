import { privateRequest } from '../../../config/requestMethod/privateRequest'


//DISABLE ANYTHING
export const Disable = async (id, state) => {
    await privateRequest.delete(`admin/${id}`)
}