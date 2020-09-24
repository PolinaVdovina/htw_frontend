import { OPEN_CHAT, HIDE_CHAT, ADD_CHAT, SET_CHATS, REMOVE_CHAT, ADD_UNREAD_CHAT, SET_CHAT_LAST_MSG_DATE } from '../../constants/action-types';
import { openChatAction, hideChatAction, setChatsAction, resetUnreadMessagesForChatAction } from './../actions/chat-actions';
import { startWebsocketConnection, getStompClient } from './../../websockets/common';
import { RootState } from '../store';
import { startLoadingAction, stopLoadingAction } from './../actions/dialog-actions';
import { searchCriteriaFetch } from './../../utils/fetchFunctions';
import { searchCriteria, sortCriteria } from './../../utils/search-criteria/builders';
import { SearchCriteriaOperation, SortCriteriaDirection } from '../../utils/search-criteria/types';
import { MessageStatus } from '../../utils/fetchInterfaces';
import { IReceivingChatData } from './../../websockets/chat/interfaces';
import { readMessagesFromChat } from '../../websockets/chat/actions';
import { RESET_UNREAD_MESSAGES } from './../../constants/action-types';





export interface IChatState {
    isOpen: boolean,
    chatName: string | null //Сейчас это логин того, с кем переписываешься
    chatViewName: string | null,
    chats: Array<IReceivingChatData> | null
}

const initialState: IChatState = {
    isOpen: false,
    chatName: null,
    chatViewName: null,
    chats: null,
};


export function chatReducer(state = initialState, action): IChatState {
    switch (action.type) {
        case OPEN_CHAT:
            return {
                ...state,
                isOpen: true,
                chatName: action.chatName,
                chatViewName: action.chatViewName,
                chats: state.chats ? state.chats.map(chat => chat.name == action.chatName ? { ...chat, unreadMessageCount: 0 } : chat) : state.chats,
            }
        case HIDE_CHAT:
            return {
                ...state,
                isOpen: false,
                chatName: null,
                chatViewName: action.chatViewName,
            }
        case SET_CHATS: {
            return {
                ...state,
                chats: action.chats.sort((a: IReceivingChatData, b: IReceivingChatData) => {
                    return Date.parse(b.lastMessageDate) - Date.parse(a.lastMessageDate);
                })
            }
        }
        case ADD_CHAT:
            let chats: Array<IReceivingChatData> = state.chats ? [...state.chats] : [];
            if (chats.filter((chat) => chat.id == action.chat.id).length == 0)
                chats.push(action.chat);
            chats = chats.sort((a: IReceivingChatData, b: IReceivingChatData) => {
                return Date.parse(b.lastMessageDate) - Date.parse(a.lastMessageDate);
            })
            return {
                ...state,
                chats: chats
            }

        case REMOVE_CHAT: {
            return {
                ...state,
                chats: state.chats ? state.chats.filter(chat => chat.id != action.chatId) : null
            }
        }

        case ADD_UNREAD_CHAT: {
            const chats: Array<IReceivingChatData> | null = state.chats ?
                state.chats.map(chat => action.chatId == chat.id ? { ...chat, unreadMessageCount: chat.unreadMessageCount + 1 } : chat)
                : null;
            return {
                ...state,
                chats: chats && chats.sort((a: IReceivingChatData, b: IReceivingChatData) => {
                    return Date.parse(b.lastMessageDate) - Date.parse(a.lastMessageDate);
                })

            }
        }
        case RESET_UNREAD_MESSAGES: {
            const chats: Array<IReceivingChatData> | null = state.chats ?
                state.chats.map(chat => action.chatId == chat.id ? { ...chat, unreadMessageCount: 0 } : chat)
                : null;
            return {
                ...state,
                chats: chats && chats.sort((a: IReceivingChatData, b: IReceivingChatData) => {
                    return Date.parse(b.lastMessageDate) - Date.parse(a.lastMessageDate);
                })

            }
        }
        case SET_CHAT_LAST_MSG_DATE: {
            const chats: Array<IReceivingChatData> | null = state.chats ?
            state.chats.map(chat => action.chatId == chat.id ? { ...chat, lastMessageDate: action.date} : chat)
            : null;
            
            return {
                ...state,
                chats: chats && chats.sort((a: IReceivingChatData, b: IReceivingChatData) => {
                    return Date.parse(b.lastMessageDate) - Date.parse(a.lastMessageDate);
                })
            }
        }

        default:
            return state
    }
}

export const showChat: (chatName: string, viewName?: string) => void = (chatName, viewName) =>
    async (dispatch, getState: () => RootState) => {
        if (!getStompClient())
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

export const initChat: (token: string) => void = (token) =>
    async (dispatch, getState: () => RootState) => {
        const request = await searchCriteriaFetch<IReceivingChatData>("/chat/getChatList", token, {
            searchCriteria: [
                searchCriteria("view", true, SearchCriteriaOperation.EQUAL),
            ],
            sortCriteria: [sortCriteria("lastMessageInChatDate", SortCriteriaDirection.DESC)],
        });
        if (request.msgInfo.msgStatus == MessageStatus.OK)
            if (request.result)
                dispatch(setChatsAction(request.result));
    }

export const readAllMessagesInChat: (chatId, token: string) => void = (token) =>
    async (dispatch, getState: () => RootState) => {
        const chatName = getState().chatReducer.chatName;
        if (chatName) {
            readMessagesFromChat(chatName);
            await dispatch(resetUnreadMessagesForChatAction(0));
        }

    }