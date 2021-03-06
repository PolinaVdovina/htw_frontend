import * as types from '../../constants/action-types';
import axios from 'axios';
import { loginAction, errorAction, logoutAction, AuthFetchNotRequiredAction, authCompletedAction } from './../actions/auth-actions';
import { startLoadingAction, stopLoadingAction } from '../actions/dialog-actions';
import { registerFetch, isValidTokenFetch, checkBackendFetch, activateAccountFetch } from '../../utils/fetchFunctions';
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
import { USER_PREFIX, SECURITY, CHAT } from './../../websockets/channels';
import { subscribeToChatMessagesTracking, subscribeToNotificationsTracking } from '../../websockets/chat/actions';
import { initChat } from './chat-reducers';
import { addChatAction, addUnreadMessageToChatAction, setLastMessageDateForChat, setChatsAction, hideChatAction } from '../actions/chat-actions';
import { setOpenChatIdAction } from './../actions/chat-actions';
import { initNotifications, countNewNotifications } from './notification-reducers';
import { setChatNotificationAction, setNotificationWatchedDate, setNotificationsAction } from './../actions/notification-actions';
import { SET_CHAT_NOTIFICATION } from './../../constants/action-types';

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
        await dispatch(startLoadingAction());
        const result = await loginFetch(identity, password);
        if (result.msgStatus == "ok" && result.token && result.role && result.login) {
            if (rememberMe) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("role", result.role);
                localStorage.setItem("login", result.login);
            }
            await dispatch(loginAction(result.login, result.token, 0, result.role));
            await Promise.all([dispatch(initChat(result.token)), dispatch(getPersonalData(result.token)), initWebsocketWithSubscribes(dispatch, getState)]);
            await dispatch(authCompletedAction(true));

            await dispatch(enqueueSnackbarAction({
                message: "Вы успешно вошли",
                options: { variant: "success" }
            }));

        } else if(result.activated == false) {
            await dispatch(enqueueSnackbarAction(
                {
                    message: "Учетная запись не активирована",
                    options: { variant: "error" }
                }));
            await dispatch(authCompletedAction(false));
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






export const activate: (code: string) => void = (code) =>
    async (dispatch, getState) => {
        dispatch(startLoadingAction());
        const authData = await activateAccountFetch(code);
        if(authData && authData.token && authData.role && authData.accountLogin) {
            localStorage.setItem("token", authData.token);
            localStorage.setItem("role", authData.role);
            localStorage.setItem("login", authData.accountLogin);

            await dispatch(loginAction(authData.accountLogin, authData.token, 0, authData.role));
            await Promise.all([dispatch(initChat(authData.token)), dispatch(getPersonalData(authData.token)), initWebsocketWithSubscribes(dispatch, getState)]);
            await dispatch(authCompletedAction(true));

            await dispatch(enqueueSnackbarAction({
                message: "Учетная запись активирована",
                options: { variant: "success" }
            }));

            await dispatch(stopLoadingAction());
            return;
        } else {
            await dispatch(enqueueSnackbarAction(
                {
                    message: "Не удалось активировать учётную запись",
                    options: { variant: "error" }
                }));
            await dispatch(stopLoadingAction());
            return;
        }
        
    }
    





export const register: (identity: string, password: string, role: string,
    phone: string | null, email: string | null,
    rememberMe?: boolean, nameOrg?: string | null,
    activated?: boolean) => void = (identity, password, role, phone, email, rememberMe, nameOrg, activated=false) =>
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
                await dispatch(setNotificationWatchedDate("1970-01-01"));
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


//Вызывается при старте страницы. Проверяется токен (если есть) и работа бакенда. Также здесь заполняется состояние авторизации (токен, логин и тд), 
//персональные данные (после авторизации); запускается веб-сокет
export const reloadAuthData: (isReconnect?: boolean) => void = (isRecconnect) =>
    async (dispatch, getState) => {
        await dispatch(startLoadingAction());

        const reloadError = () => {
            dispatch(enqueueSnackbarAction({
                message: "Сервер не отвечает. Переподключение...",
                options: { variant: "error" }
            }));
            const timer = setTimeout(
                () => {
                    dispatch(reloadAuthData(true))
                }, 7000
            )

        }

        const reloadSuccess = async () => {
            await dispatch(authCompletedAction(true));
            await dispatch(enqueueSnackbarAction({
                message: "Вы успешно вошли",
                options: { variant: "success" }
            }));
        }

        const login = localStorage.getItem("login");
        const role = localStorage.getItem("role");
        const token = localStorage.getItem("token");

        if (login && role && token) {
            const isValidToken = await isValidTokenFetch(token);
            if (isValidToken) {
                await dispatch(loginAction(login, token, null, role))
                await Promise.all([dispatch(initChat(token)), initWebsocketWithSubscribes(dispatch, getState), dispatch(getPersonalData(token))]);
                await dispatch(initNotifications());
                await reloadSuccess();
            } else if (isValidToken == false) {
                clearAuth();
                await dispatch(authCompletedAction(false));
            } else {
                reloadError();
                return;
            }

        } else {
            clearAuth();
            const isOk = await checkBackendFetch();
            if (isOk) {
                await dispatch(authCompletedAction(false));

                if (isRecconnect) {
                    dispatch(enqueueSnackbarAction({
                        message: "Соединение восстановлено",
                        options: { variant: "success" }
                    }));
                }

            } else {
                reloadError();
                return;
            }
        }

        await dispatch(stopLoadingAction());

    }

export const logout: () => void = () =>
    async (dispatch, getState) => {
        await dispatch(startLoadingAction());
        await dispatch(logoutAction());
        await dispatch(resetPersonalDataAction());
        await dispatch(setChatsAction(null));
        await dispatch(hideChatAction());
        await dispatch(setNotificationsAction(null));
        
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

                }
                onConnected(dispatch, getState)();

            },
            onError(dispatch, getState));
    }
}

const onMessageReceived = (dispatch, getState) => (msg: Stomp.Message) => {
    const msgBody: IChatReceivingMessage = JSON.parse(msg.body);
/*     dispatch(addNotificationsAction(
        [{ message: msgBody.content, sender: msgBody.sender }]
    )); */
}

const onError = (dispatch, getState: () => RootState) => async () => {
    await dispatch(enqueueSnackbarAction({
        message: "Проблемы с соединением. Переподключение...",
        options: { variant: "error" }
    }));
    const token = getState().authReducer.token;
    await dispatch(startLoadingAction());
    if (token) {
        const isValidToken = await isValidTokenFetch(token);
        if (isValidToken == true) {
            await initWebsocketWithSubscribes(dispatch, getState, true);
            await dispatch(stopLoadingAction());
        } else if (isValidToken == false) {
            await dispatch(logout());
            await(stopLoadingAction());
            await dispatch(enqueueSnackbarAction({
                message: "У вас возникли проблемы с авторизацией",
                options: { variant: "error" }
            }));
        } else {
            setTimeout(async () => await dispatch(onError(dispatch, getState)), 7000);
        }
    }

}


const onConnected = (dispatch, getState: () => RootState) => () => {
    const onChatMessageReceived = async (message: IChatReceivingMessage) => {

        //Говно код для обновления количества непрочитанных сообщений
        if (message.sender != getState().authReducer.login) {
            if (getState().chatReducer.chatId) {
                if (getState().chatReducer.chatId != message.chatId) {
                    dispatch(addUnreadMessageToChatAction(message.chatId));
                }
            } else if (getState().chatReducer.chatName == message.sender) {
                dispatch(setOpenChatIdAction(message.chatId));
                dispatch(addUnreadMessageToChatAction(message.chatId));

                //if(countNew ))

            }
            else dispatch(addUnreadMessageToChatAction(message.chatId));
        }

        //Обновляем дату последнего сообщения в чате на основе полученного сообщения. Не делать же лишний запрос на сервак, когда я итак всё узнать могу?
        dispatch(setLastMessageDateForChat(message.chatId, message.createdDate))

        //Если сервак считал нужным передать мне не только сообщение, но и чат, значит, следует попробовать добавить его в список чатов в редуксе
        if (message.newChat)
            await dispatch(addChatAction(message.newChat));
        //await dispatch(initNotifications());
    }

    const onNotificationReceived = async (notificationOrEvent) => {
        //alert(JSON.stringify(notification));

        if(notificationOrEvent.isNoNotification) {
            if(notificationOrEvent.eventType == "DELETE_CHAT_NOTIFICATION") {
                dispatch( setChatNotificationAction(null) );
            }
        }
        else
            dispatch( setChatNotificationAction(notificationOrEvent) );
/*         else {
            if(notificationOrEvent.eventType == "DELETE_NOTIFICATION")
                dispatch( setChatNotificationAction(null)  );
        } */
    }

    //getStompClient()?.subscribe(rootUrl + "/user/security/queue/t", onMessageReceived(dispatch, getState));
    subscribeToChatMessagesTracking(onChatMessageReceived);
    subscribeToNotificationsTracking(onNotificationReceived);
    /*     if (isReconnect) {
            dispatch(enqueueSnackbarAction({
                message: "Соединение восстановлено",
                options: { variant: "success" }
            }));
    
        } */
}