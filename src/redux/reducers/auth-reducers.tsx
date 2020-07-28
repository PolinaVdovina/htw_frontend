import * as types from '../../constants/action-types';
import axios from 'axios';
import { loginAction, errorAction, logoutAction, AuthFetchNotRequiredAction } from './../actions/auth-actions';
import { startLoadingAction, stopLoadingAction } from '../actions/dialog-actions';
import { getPersonalDataFetch, getEmployerFetch, registerFetch, isValidTokenFetch } from '../../utils/fetchFunctions';
import { addressGlue, genderIntToStr } from '../../utils/appliedFunc';
import { fillPersonalDataAction } from '../actions/user-personals';
import {loginFetch} from '../../utils/fetchFunctions'
import { enqueueSnackbar as enqueueSnackbarAction} from '../actions/snackbar-action';
import { getPersonalData } from './user-personals-reducers';

export interface IAuthState {
    loggedIn: boolean,
    login?: string | null,
    token?: string | null,
    user_id?: number | null,
    entityType?: string | null,
    error?: string | null,
    msgStatus?: string | null,
    isFetched: boolean,
}

const initialState: IAuthState = {
    loggedIn: false,
    login: null,
    token: null,
    user_id: null,
    entityType: null,
    error: null,
    msgStatus: null,
    isFetched: false,
    
  };


export function authReducer(state = initialState, action): IAuthState {
    switch (action.type) {
        case types.LOG_IN:
        return {
            isFetched: true,
            loggedIn: true,
            login: action.login,
            token: action.token,
            user_id: action.id,
            entityType: action.entityType,
            msgStatus: "ok"
            
        }
        case types.LOG_OUT:
            return initialState;
        case types.AUTH_FETCH_NOT_REQUIRED: 
            return {
                loggedIn: false,
                isFetched: true,
            }
        
        case types.LOG_IN_ERROR:
            return {
                isFetched: true,
                loggedIn: false,
                msgStatus: "error"
            }
        default:
            return state;
    }
}


export const login: (identity: string, password: string, rememberMe?: boolean) => void = (identity, password, rememberMe) => 
     async (dispatch, getState) => {
        if(rememberMe == undefined)
            rememberMe = true;
        await dispatch(startLoadingAction());
        const result = await loginFetch(identity, password);
        const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
        if(result.msgStatus == "ok" && result.token && result.role) {
            if(rememberMe) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("role", result.role);
                localStorage.setItem("login", identity);
            }
            await dispatch(loginAction(identity, result.token, 0, result.role));
            await dispatch(getPersonalData(result.token));
            await dispatch(enqueueSnackbarAction({
                message:"Вы успешно вошли", 
                options: { variant: "success"}
            }));

        } else {
            await dispatch(enqueueSnackbarAction(
            {
                message:"Неверный логин или пароль",
                options: {variant: "error"}
            }));
        }
        await dispatch(stopLoadingAction());
}



export const register: (identity: string, password: string, role: string, 
    phone: string | null, email: string | null, 
    rememberMe?: boolean) => void = (identity, password, role, phone, email, rememberMe) => 
async (dispatch, getState) => {
    dispatch(startLoadingAction());
    const result = await registerFetch(identity, email, phone, password, role);

    await dispatch(fillPersonalDataAction({

    }));

    if(result.msgStatus == "ok" && result.token) {
        if(rememberMe == undefined)
            rememberMe = true;
        if(rememberMe) {
            localStorage.setItem("token", result.token);
            localStorage.setItem("role", role);
            localStorage.setItem("login", identity);
        }
        dispatch(loginAction(identity, result.token, 0, role));
        dispatch( enqueueSnackbarAction({
            message: "Пользователь успешно зарегистрирован", 
            options: {variant: "success"}}));

    } 
    else {
        dispatch(enqueueSnackbarAction({
            message:"Такой пользователь уже существует", 
            options:{variant: "error"}
        }));
    }
    dispatch(stopLoadingAction());

}

export const reloadAuthData: () => void = () => 
async (dispatch, getState) => {
    await dispatch(startLoadingAction());
    
    const login = localStorage.getItem("login");
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if(login && role && token) {
        const isValidToken = await isValidTokenFetch(token);
        if(isValidToken) {
            await dispatch(loginAction(login, token, null, role))
            await dispatch(getPersonalData(token));
        } else {
            clearAuth();

            await dispatch(AuthFetchNotRequiredAction());
        }
        
    } else {
        clearAuth();

        await dispatch(AuthFetchNotRequiredAction());
    }

    await dispatch(stopLoadingAction());

}



export const logout: () => void = () => 
async (dispatch, getState) => {
    await dispatch(startLoadingAction());
    
    await dispatch(logoutAction());
    clearAuth();
    await dispatch(stopLoadingAction());

}




export const clearAuth = () => {
    if(localStorage.getItem("login"))
        localStorage.removeItem("login");
    if(localStorage.getItem("token"))
        localStorage.removeItem("token");
    if(localStorage.getItem("role"))
        localStorage.removeItem("role");
}


