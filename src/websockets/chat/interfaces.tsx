//Модель сообщения, которую клиент ПОЛУЧАЕТ
export interface IChatReceivingMessage {
    chatId: number,
    content: string,
    sender: string,
    senderViewName: string,
    id: number,
    createdDate: string,
    target: string,
    newChat?: IReceivingChatData
}


//Модель сообщения, которую клиент ОТПРАВЛЯЕТ
export interface IChatSendingMessage {
    content: string,
}

export interface IReceivingChatData {
    id: number
    name: string
    isGroupChat: boolean
    unreadMessageCount: number
    lastMessageDate: string
    interlocutorLogin: string,
}