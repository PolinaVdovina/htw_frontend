import { OPEN_CHAT, HIDE_CHAT, ADD_CHAT, SET_CHATS, REMOVE_CHAT, ADD_UNREAD_CHAT, SET_CHAT_LAST_MSG_DATE } from '../../constants/action-types';
import { openChatAction, hideChatAction, setChatsAction, resetUnreadMessagesForChatAction, setOpenChatIdAction } from './../actions/chat-actions';
import { startWebsocketConnection, getStompClient } from './../../websockets/common';
import { RootState } from '../store';
import { startLoadingAction, stopLoadingAction } from './../actions/dialog-actions';
import { searchCriteriaFetch, getPrivateChatFetch } from './../../utils/fetchFunctions';
import { searchCriteria, sortCriteria } from './../../utils/search-criteria/builders';
import { SearchCriteriaOperation, SortCriteriaDirection } from '../../utils/search-criteria/types';
import { MessageStatus } from '../../utils/fetchInterfaces';
import { IReceivingChatData } from './../../websockets/chat/interfaces';
import { readMessagesFromChat } from '../../websockets/chat/actions';
import { RESET_UNREAD_MESSAGES, SET_OPEN_CHAT_ID } from './../../constants/action-types';


export interface IChatState {
    isOpen: boolean,
    chatName: string | null //Сейчас это логин того, с кем переписываешься
    chatViewName: string | null,
    chatId: number | null,
    chats: Array<IReceivingChatData> | null
}

const initialState: IChatState = {
    isOpen: false,
    chatName: null,
    chatViewName: null,
    chats: null,
    chatId: null,
};


export function chatReducer(state = initialState, action): IChatState {
    switch (action.type) {
        case OPEN_CHAT:
            return {
                ...state,
                chatId: action.chatId != undefined ? action.chatId : state.chatId,
                isOpen: true,
                chatName: action.chatName,
                chatViewName: action.chatViewName,
                chats: state.chats && state.chats.map(chat => chat.name == action.chatName ? { ...chat, unreadMessageCount: 0 } : chat),
            }
        case HIDE_CHAT:
            return {
                ...state,
                chatId: null,
                isOpen: false,
                chatName: null,
                chatViewName: action.chatViewName,
            }
        case SET_CHATS: {
            return {
                ...state,
                chats: action.chats && action.chats.sort((a: IReceivingChatData, b: IReceivingChatData) => {
                    return Date.parse(b.lastMessageDate) - Date.parse(a.lastMessageDate);
                })
            }
        }
        case ADD_CHAT:
            let chats: Array<IReceivingChatData> = state.chats ? [...state.chats] : [];
            if (chats.filter((chat) => chat.id == action.chat.id).length == 0)
                chats.push(action.chat);
            chats = chats && chats.sort((a: IReceivingChatData, b: IReceivingChatData) => {
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
                state.chats.map(chat => action.chatId == chat.id ? { ...chat, lastMessageDate: action.date } : chat)
                : null;

            return {
                ...state,
                chats: chats && chats.sort((a: IReceivingChatData, b: IReceivingChatData) => {
                    return Date.parse(b.lastMessageDate) - Date.parse(a.lastMessageDate);
                })
            }
        }
        case SET_OPEN_CHAT_ID: {
            return {
                ...state,
                chatId: action.chatId,
            }
        }


        default:
            return state
    }
}

export const getUnreadMessagesCount = (chats: Array<IReceivingChatData>) => {
    return chats.map(chat => chat.unreadMessageCount).reduce((sum, current) => sum + current, 0);
}

export const showChat: (chatName: string, viewName?: string, chatId?: number) => void = (chatName, viewName, chatId) =>
    async (dispatch, getState: () => RootState) => {
        if (!getStompClient())
            return;

        await dispatch(openChatAction(chatName, viewName, chatId));
        if (chatId)
            await dispatch(resetUnreadMessagesForChatAction(chatId));
        //const token = getState().authReducer.token;
        /* if (token)
            stompClient?.subscribe(rootUrl + "/user/security/queue/t", onMessageReceived); */

    }


export const openPrivateChat: (targetLogin: string, viewName?: string) => void = (targetLogin, viewName) =>
    async (dispatch, getState: () => RootState) => {
        if (!getStompClient())
            return;

        const chats = getState().chatReducer.chats;
        const findChatInRedux = chats && chats.find(c => c.interlocutorLogin == targetLogin);
        if (!findChatInRedux) {
            dispatch(startLoadingAction());
            const fetchChat = await getPrivateChatFetch(getState().authReducer.token, targetLogin);
            const chatId = fetchChat.id;

            if (chatId) {
                //await dispatch(setOpenChatIdAction(chatId));
                //alert("hehe");
                dispatch(showChat(targetLogin, viewName, chatId));
            } else {
                await dispatch(showChat(targetLogin, viewName));
            }

            dispatch(stopLoadingAction());
        } else {
            dispatch(showChat(targetLogin, viewName, findChatInRedux.id));
        }
    }


export const openChat: (chatName: string, viewName?: string) => void = (chatName, viewName) =>
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

export const readAllMessagesInChat: (chatId: number, token: string) => void = (chatId, token) =>
    async (dispatch, getState: () => RootState) => {
        //const chatName = getState().chatReducer.chatName;
        if (chatId) {
            readMessagesFromChat(chatId);
            await dispatch(resetUnreadMessagesForChatAction(0));
            
        }

    }