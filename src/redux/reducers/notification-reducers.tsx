import { ADD_NOTIFICATIONS, REMOVE_NOTIFICATIONS } from '../../constants/action-types';
import { openChatAction, hideChatAction } from './../actions/chat-actions';
import { startWebsocketConnection, getStompClient } from './../../websockets/common';
import { RootState } from '../store';
import { startLoadingAction, stopLoadingAction } from './../actions/dialog-actions';
import { INotificationData } from './../actions/notification-actions';

export interface INotificationState {
    notifications: Array<INotificationData> | null,
    newNotifications: number,
}

const initialState: INotificationState = {
    notifications: null,
    newNotifications: 0,
};

export function notificationReducer(state = initialState, action): INotificationState {
    switch (action.type) {
        case ADD_NOTIFICATIONS:
            return {
                newNotifications: state.newNotifications + 1,
                notifications: state.notifications ? [...state.notifications, [...action.notifications]] : action.notifications
            }
        case REMOVE_NOTIFICATIONS:
            return {
                ...state,
                newNotifications: 0,
            }
        default:
            return state;
    }
}