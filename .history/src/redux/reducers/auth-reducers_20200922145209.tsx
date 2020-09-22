import * as types from '../../constants/action-types';
import axios from 'axios';
import { loginAction, errorAction, logoutAction, AuthFetchNotRequiredAction, authCompletedAction } from './../actions/auth-actions';
import { startLoadingAction, stopLoadingAction } from '../actions/dialog-actions';
import { registerFetch, isValidTokenFetch } from '../../utils/fetchFunctions';
import { addressGlue, genderIntToStr } from '../../utils/appliedFunc';
import { fillPersonalDataAction, resetPersonalDataAction } from '../actions/user-personals';
import { loginFetch } from '../../utils/fetchFunctions'
import { enqueueSnackbar as enqueueSnackbarAction } from '../actions/snackbar-action';
import { getPersonalData } from './user-personals-reducers';
import { startWebsocketConnection, getStompClient, rootUrl, stopWebsocketConnection, isConnectedToWebsocket } from './../../websockets/common';
import Stomp from 'stompjs';
import { RootState } from '../store';
import { addNotificationsAction } from '../actions/notification-actions';
import { IChatReceivingMessage } from './../../websockets/chat/interfaces';


export interface IAuthState {
    authCompleteStatus?: boolean | null,
    login?: string | null,
    token?: string | null,
    user_id?: number | null,
    entityType?: string | null,
    error?: string | null,
    msgStatus?: string | null,
    webSocketError?: boolean | null,
}

const initialState: IAuthState = {
    authCompleteStatus: null,
    login: null,
    token: null,
    user_id: null,
    entityType: null,
    error: null,
    msgStatus: null,
    webSocketError: null,
};


export function authReducer(state = initialState, action): IAuthState {
    switch (action.type) {
        case types.LOG_IN:
            return {
                login: action.login,
                token: action.token,
                user_id: action.id,
                entityType: action.entityType,
                msgStatus: "ok"

            }
        case types.LOG_OUT:
            return {
                ...initialState,
                authCompleteStatus: false,
            }
        case types.LOG_IN_ERROR:
            return {
                //authCompleted: true,
                authCompleteStatus: false,
                msgStatus: "error"
            }
        case types.AUTH_COMPLETED:
            return {
                ...state,
                authCompleteStatus: action.loggedIn,
            }
        default:
            return state;
    }
}

export const login: (identity: string, password: string, rememberMe?: boolean) => void = (identity, password, rememberMe) =>
    async (dispatch, getState) => {
        if (rememberMe == undefined)
            rememberMe = true;
        alert('sd')
        await dispatch(startLoadingAction());
        const result = await loginFetch(identity, password);
        const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
        if (result.msgStatus == "ok" && result.token && result.role) {
            if (rememberMe) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("role", result.role);
                localStorage.setItem("login", identity);
            }
            await dispatch(loginAction(identity, result.token, 0, result.role));
            await Promise.all([dispatch(getPersonalData(result.token)), initWebsocketWithSubscribes(dispatch, getState)]);
            await dispatch(authCompletedAction(true));

            await dispatch(enqueueSnackbarAction({
                message: "Вы успешно вошли",
                options: { variant: "success" }
            }));

        } else {
            await dispatch(enqueueSnackbarAction(
                {
                    message: "Неверный логин или пароль",
                    options: { variant: "error" }
                }));
            await dispatch(authCompletedAction(false));
        }
        await dispatch(stopLoadingAction());
    }



export const register: (identity: string, password: string, role: string,
    phone: string | null, email: string | null,
    rememberMe?: boolean, nameOrg?: string | null) => void = (identity, password, role, phone, email, rememberMe, nameOrg) =>
        async (dispatch, getState) => {
            dispatch(startLoadingAction());
            const result = await registerFetch(identity, email, phone, password, role, nameOrg);

            await dispatch(fillPersonalDataAction({
                email,
                phone
            }));

            if ((role == 'ROLE_INSTITUTION' || role == 'ROLE_EMPLOYER') && nameOrg && nameOrg != '')
                await dispatch(fillPersonalDataAction({
                    name: nameOrg
                }));


            if (result.msgStatus == "ok" && result.token) {
                if (rememberMe == undefined)
                    rememberMe = true;
                if (rememberMe) {
                    localStorage.setItem("token", result.token);
                    localStorage.setItem("role", role);
                    localStorage.setItem("login", identity);
                }
                await dispatch(loginAction(identity, result.token, 0, role));
                initWebsocketWithSubscribes(dispatch, getState);
                await dispatch(authCompletedAction(true));
                dispatch(enqueueSnackbarAction({
                    message: "Пользователь успешно зарегистрирован",
                    options: { variant: "success" }
                }));

            }
            else {
                dispatch(enqueueSnackbarAction({
                    message: "Такой пользователь уже существует",
                    options: { variant: "error" }
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

        if (login && role && token) {
            const isValidToken = await isValidTokenFetch(token);
            if (isValidToken) {
                await dispatch(loginAction(login, token, null, role))
                await Promise.all([initWebsocketWithSubscribes(dispatch, getState), dispatch(getPersonalData(token))]);
                await dispatch(authCompletedAction(true));
            } else {
                clearAuth();
                await dispatch(authCompletedAction(false));
            }

        } else {
            clearAuth();
            await dispatch(authCompletedAction(false));
        }

        await dispatch(stopLoadingAction());

    }

export const logout: () => void = () =>
    async (dispatch, getState) => {
        await dispatch(startLoadingAction());
        await dispatch(logoutAction());
        await dispatch(resetPersonalDataAction());
        clearAuth();
        stopWebsocketConnection();
        await dispatch(stopLoadingAction());

    }

export const clearAuth = () => {
    if (localStorage.getItem("login"))
        localStorage.removeItem("login");
    if (localStorage.getItem("token"))
        localStorage.removeItem("token");
    if (localStorage.getItem("role"))
        localStorage.removeItem("role");

}


const initWebsocketWithSubscribes = async (dispatch, getState: () => RootState, isReconnect = false) => {
    const token = getState().authReducer.token;
    if (token) {
        await startWebsocketConnection(token,
            () => {
                if (isReconnect) {
                    dispatch(enqueueSnackbarAction({
                        message: "Соединение восстановлено",
                        options: { variant: "success" }
                    }));
                    onConnected(dispatch, getState)
                }
            },
            onError(dispatch, getState));
    }
}

const onMessageReceived = (dispatch, getState) => (msg: Stomp.Message) => {
    const msgBody: IChatReceivingMessage = JSON.parse(msg.body);
    dispatch(addNotificationsAction(
        [{ message: msgBody.content, sender: msgBody.sender }]
    ));
}

const onError = (dispatch, getState) => async () => {
    dispatch(enqueueSnackbarAction({
        message: "Проблемы с соединением. Переподключение...",
        options: { variant: "error" }
    }));

    await dispatch(startLoadingAction());
    await initWebsocketWithSubscribes(dispatch, getState, true);
    await dispatch(stopLoadingAction());

}

const onConnected = (dispatch, getState) => () => {
    getStompClient()?.subscribe(rootUrl + "/user/security/queue/t", onMessageReceived(dispatch, getState));

    /*     if (isReconnect) {
            dispatch(enqueueSnackbarAction({
                message: "Соединение восстановлено",
                options: { variant: "success" }
            }));
    
        } */
}