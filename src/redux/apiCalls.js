import { loginFailure, loginStart, loginSuccess } from './userRedux'
import {
    getProductStart,
    getProductSuccess,
    getProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure
} from './productReducer'
import {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    deleteUsersStart,
    deleteUsersSuccess,
    deleteUsersFailure,
    updateUsersStart,
    updateUsersSuccess,
    updateUsersFailure
} from './usersReducer'
import { publicRequest, userRequest } from '../requestMethods'

//LOGIN DE USUARIO
export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post('auth/login', user)
        dispatch(loginSuccess(res.data))
    } catch (err) {
        dispatch(loginFailure())
    }
}

//GET PRODUCT
export const getProducts = async (dispatch) => {
    dispatch(getProductStart())
    try {
        const res = await publicRequest.get('products')
        dispatch(getProductSuccess(res.data))
    } catch (err) {
        dispatch(getProductFailure())
    }
}

//DELETE PRODUCT
export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart())
    try {
        const res = await userRequest.delete(`products/${id}`)
        dispatch(deleteProductSuccess(res.data))
    } catch (err) {
        dispatch(deleteProductFailure())
    }
}

//UPDATE PRODUCT
export const updateProduct = async (dispatch, id, product) => {
    dispatch(updateProductStart())
    try {
        const res = await userRequest.put(`/products/${id}`, product)
        dispatch(updateProductSuccess(res.data))
    } catch (err) {
        dispatch(updateProductFailure())
    }
}

//ADD PRODUCT
export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart())
    try {
        const res = await userRequest.post(`/products`, product)
        dispatch(addProductSuccess(res.data))
    } catch (err) {
        dispatch(addProductFailure())
    }
}

//GET USERS
export const getUsers = async (dispatch) => {
    dispatch(getUsersStart())
    try {
        const res = await userRequest.get('users')
        dispatch(getUsersSuccess(res.data))
    } catch (err) {
        dispatch(getUsersFailure())
    }
}

//DELETE USER
export const deleteUsers = async (dispatch, id) => {
    dispatch(deleteUsersStart())
    try {
        const res = await userRequest.delete(`users/${id}`)
        dispatch(deleteUsersSuccess(res.data))
    } catch (err) {
        dispatch(deleteUsersFailure())
    }
}

//UPDATE USER
export const updateUser = async (dispatch, id, newUsersUp) => {
    dispatch(updateUsersStart())
    try {
        const res = await userRequest.update(`/products/${id}`, newUsersUp)
        dispatch(updateUsersSuccess(res.data))
    } catch (err) {
        dispatch(updateUsersFailure())
    }
}