import { OPEN_CHAT, HIDE_CHAT } from '../../constants/action-types';

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

