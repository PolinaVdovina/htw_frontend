import { OPEN_CHAT, HIDE_CHAT, SET_CHATS, ADD_CHAT, REMOVE_CHAT, ADD_UNREAD_CHAT, SET_CHAT_LAST_MSG_DATE } from '../../constants/action-types';
import { IChatReceivingMessage } from '../../websockets/chat/interfaces';
import { IReceivingChatData } from './../../websockets/chat/interfaces';
import { RESET_UNREAD_MESSAGES } from './../../constants/action-types';

//chatName - сейчас это логин пиздюка, с которым идет переписка
export function openChatAction(chatName: string, chatViewName?: string) {
    return {
        type: OPEN_CHAT,
        chatName,
        chatViewName
    };
}

export function hideChatAction() {
    return {
        type: HIDE_CHAT,
    };
}


export function setChatsAction(chats: Array<IReceivingChatData>) {
    return {
        type: SET_CHATS,
        chats
    };
}


export function addChatAction(chat: IReceivingChatData) {
    return {
        type: ADD_CHAT,
        chat
    };
}

export function addUnreadMessageToChatAction(chatId: number) {
    return {
        type: ADD_UNREAD_CHAT,
        chatId
    };
}



export function removeChatAction(chatId: number) {
    return {
        type: REMOVE_CHAT,
        chatId
    };
}

export function resetUnreadMessagesForChatAction(chatId: number) {
    return {
        type: RESET_UNREAD_MESSAGES,
        chatId
    };
}

export function setLastMessageDateForChat(chatId: number, date: string) {
    return {
        type: SET_CHAT_LAST_MSG_DATE,
        chatId,
        date
    };
}