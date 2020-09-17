import { ADD_NOTIFICATIONS, REMOVE_NOTIFICATIONS } from '../../constants/action-types';

export interface INotificationData {
    message: string,
    sender: string,
} 

export function addNotificationsAction(notifications: Array<INotificationData> | null) {
    return {
        type: ADD_NOTIFICATIONS,
        notifications: notifications
    };
}

export function removeNotificationActions() {
    return {
        type: REMOVE_NOTIFICATIONS,
    };
}

