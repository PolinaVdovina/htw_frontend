//Модель сообщения, которую клиент ПОЛУЧАЕТ
export interface IChatReceivingMessage {
    content: string,
    sender: string,
    senderViewName: string,
    id: number,
}


//Модель сообщения, которую клиент ОТПРАВЛЯЕТ
export interface IChatSendingMessage {
    content: string,
}