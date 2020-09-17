import { OPEN_CHAT, HIDE_CHAT } from '../../constants/action-types';
import { openChatAction, hideChatAction } from './../actions/chat-actions';
import { startWebsocketConnection, getStompClient } from './../../websockets/common';
import { RootState } from '../store';
import { startLoadingAction, stopLoadingAction } from './../actions/dialog-actions';

export interface IAuthState {
    isOpen: boolean,
    chatName: string | null //Сейчас это логин того, с кем переписываешься
    chatViewName: string | null
}

const initialState: IAuthState = {
    isOpen: false,
    chatName: null,
    chatViewName: null,
};


export function chatReducer(state = initialState, action): IAuthState {
    switch (action.type) {
        case OPEN_CHAT:
            return {
                isOpen: true,
                chatName: action.chatName,
                chatViewName: action.chatViewName,

            }
        case HIDE_CHAT:
            return {
                isOpen: false,
                chatName: null,
                chatViewName: action.chatViewName,
            }
        default:
            return state;
    }
}

export const showChat: (chatName: string, viewName?: string) => void = (chatName: string, viewName?: string) =>
    async (dispatch, getState: () => RootState) => {
        if(!getStompClient())
            return;
  
        await dispatch(openChatAction(chatName, viewName));
        const token = getState().authReducer.token;
        /* if (token)
            stompClient?.subscribe(rootUrl + "/user/security/queue/t", onMessageReceived); */
        
    }


export const hideChat: () => void = () =>
    async (dispatch, getState: () => RootState) => {
        await dispatch(hideChatAction());
    }
