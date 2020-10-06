import { ADD_NOTIFICATIONS, REMOVE_NOTIFICATIONS } from '../../constants/action-types';

export interface INotificationData {
    message?: string,
    title: string,
    sender?: string,
    id?: any
} 

export function addNotificationsAction(notifications: Array<INotificationData> | null) {
    return {
        type: ADD_NOTIFICATIONS,
        notifications: notifications
    };
}

export function removeNotificationActions(id: number) {
    return {
        type: REMOVE_NOTIFICATIONS,
    };
}

