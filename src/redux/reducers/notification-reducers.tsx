import { ADD_NOTIFICATIONS, REMOVE_NOTIFICATIONS, SET_NEW_NOTIFICATION_COUNT } from '../../constants/action-types';
import { openChatAction, hideChatAction } from './../actions/chat-actions';
import { startWebsocketConnection, getStompClient } from './../../websockets/common';
import { RootState } from '../store';
import { startLoadingAction, stopLoadingAction } from './../actions/dialog-actions';
import { INotificationData, addNotificationsAction, setNotificationsAction } from './../actions/notification-actions';
import { getUnreadMessagesCount, getUnreadMessagesLastDate } from './chat-reducers';
import { SET_NOTIFICATIONS, SET_NOTIFICATION_WATCHED_DATE, SET_CHAT_NOTIFICATION } from './../../constants/action-types';
import { getNotificationsFetch } from '../../utils/fetchFunctions';

export interface INotificationState {
    notifications: Array<INotificationData> | null,
    newNotifications: number,
    notificationWatchLastDate?: string | null,
}

const initialState: INotificationState = {
    notifications: null,
    newNotifications: 0,
    notificationWatchLastDate: null,
}

export function notificationReducer(state = initialState, action): INotificationState {
    switch (action.type) {
        case ADD_NOTIFICATIONS:
            const notifications = state.notifications ? [...state.notifications, [...action.notifications]] : action.notifications;
            return {
                ...state,
                newNotifications: countNewNotifications(notifications, state.notificationWatchLastDate).length,
                notifications: notifications,
            }
        case SET_NOTIFICATIONS:
            return {
                ...state,
                newNotifications: countNewNotifications(action.notifications, state.notificationWatchLastDate).length,
                notifications: action.notifications
            }
        case REMOVE_NOTIFICATIONS:
            return {
                ...state,
                notifications: [],
                newNotifications: 0,
            }
        case SET_NOTIFICATION_WATCHED_DATE: {

            return {
                ...state,
                newNotifications: countNewNotifications(state.notifications, action.date).length,
                notificationWatchLastDate: action.date
            }
        }
        case SET_NEW_NOTIFICATION_COUNT: {
            return {
                ...state,
                newNotifications: action.count,
            }
        }
        case SET_CHAT_NOTIFICATION: {
            const currentNotificationsWithoutChat: INotificationData[] = state.notifications ?
                state.notifications?.filter(n => n.notificationType != "CHAT_NOTIFICATION") : []
            const newNotifications = action.notification ? [...currentNotificationsWithoutChat, action.notification] : currentNotificationsWithoutChat;
            return {
                ...state,
                newNotifications: countNewNotifications(newNotifications, state.notificationWatchLastDate).length,
                notifications: newNotifications
            }
        }
        default:
            return state;
    }
}

export const countNewNotifications = (notifications: INotificationData[] | null, notificationWatchLastDate) => {
    if (!notifications)
        return [];

    //alert(JSON.stringify(notifications.filter( n => Date.parse(n.createdDate) > Date.parse(notificationWatchLastDate))))
    return notifications.filter(n => Date.parse(n.createdDate) >= Date.parse(notificationWatchLastDate));
}

export const initNotifications: () => void = () => async (dispatch, getState: () => RootState) => {
    const token = getState().authReducer.token;
    if (token) {
        const notificationFetch = await getNotificationsFetch(getState().authReducer.token)
        await dispatch(setNotificationsAction(notificationFetch.notifications));
    }
    /*     const chats = getState().chatReducer.chats;
    
        if (chats) {
            const unreadMessageCount = getUnreadMessagesCount(chats);
            const lastMessageDate = getUnreadMessagesLastDate(chats);
            if (unreadMessageCount > 0) {
                dispatch(setNotificationsAction(
                    [{
                        title: `У вас есть непрочитанные сообщения (${unreadMessageCount})`,
                        createdDate: lastMessageDate.toUTCString(),
                    }]
                ));
            }
            else {
                dispatch(setNotificationsAction([]));
            }
        } */

} 