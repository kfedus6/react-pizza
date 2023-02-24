import { productSlice } from "./ProductSlice";
import { userSlice } from "./UserSlice";
import { Product } from "../../models/Product";
import { AppDispatch } from "../store";
import { $host, $authHost } from "../../http";
import jwt_decode from 'jwt-decode'
import { User } from "../../models/User";

// Fetch Product

export const fetchsProducts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(productSlice.actions.productFetching)
        const response = await $host.get<Product[]>('pizza/product')
        dispatch(productSlice.actions.productFetchingSuccess(response.data))
    } catch (e: string | undefined | any) {
        dispatch(productSlice.actions.productFetchingError(e.message))
    }
}

//Fetch User

export const fetchUserRegistration = (objUser: User) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await $host.post<User>('pizza/user/registration', objUser)
        localStorage.setItem('token', data.token)
        const user: any = jwt_decode(data.token)
        dispatch(userSlice.actions.userFetchingRegistration({ is_admin: user.admin, user: user, is_login: true }))
    } catch (e: any) {
        dispatch(userSlice.actions.userFetchingError(e.message))
    }
}

export const fetchUserLogin = (objUser: User) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await $host.post('pizza/user/login', objUser)
        localStorage.setItem('token', data.token)
        const user: any = jwt_decode(data.token)
        dispatch(userSlice.actions.userFetchingLogin({ is_admin: user.admin, user: user, is_login: true }))
    } catch (e: any) {
        dispatch(userSlice.actions.userFetchingError(e.message))
    }
}

export const fetchUserAuthorization = () => async (dispatch: AppDispatch) => {
    try {
        const { data } = await $authHost.get('pizza/user/authorization')
        const user: any = jwt_decode(data.token)
        dispatch(userSlice.actions.userFetchingAuthorization({ is_admin: user.admin, user: user, is_login: true }))
    } catch (e: any) {
        dispatch(userSlice.actions.userFetchingAuthorization({ is_admin: false, user: {}, is_login: false }))
    }
}

export const fetchUserExit = () => async (dispatch: AppDispatch) => {
    localStorage.removeItem('token')
    dispatch(userSlice.actions.userFetchingLogin({ is_admin: false, user: {}, is_login: false }))
}