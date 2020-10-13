import { ADD_NOTIFICATIONS, REMOVE_NOTIFICATIONS, SET_NEW_NOTIFICATION_COUNT } from '../../constants/action-types';
import { SET_NOTIFICATIONS, SET_NOTIFICATION_WATCHED_DATE, SET_CHAT_NOTIFICATION } from './../../constants/action-types';

export interface INotificationData {
    id?: any,
    createdDate: string,
    notificationType: "TEXT" | "CHAT_NOTIFICATION" 
} 

export function addNotificationsAction(notifications: Array<INotificationData> | null) {
    return {
        type: ADD_NOTIFICATIONS,
        notifications: notifications
    };
}

export function setNotificationsAction(notifications: Array<INotificationData> | null) {
    return {
        type: SET_NOTIFICATIONS,
        notifications: notifications
    };
}


export function removeNotificationActions(id: number) {
    return {
        type: REMOVE_NOTIFICATIONS,
    };
}


export function setNotificationWatchedDate(date: string) {
    return {
        type: SET_NOTIFICATION_WATCHED_DATE,
        date,
    }
}

export function setNewNotificationCount(count: number) {
    return {
        type: SET_NEW_NOTIFICATION_COUNT,
        count,
    }
}


export function setChatNotificationAction(notification) {
    return {
      type: SET_CHAT_NOTIFICATION,
      notification: notification,
    };
  }
  
  