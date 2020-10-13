//to - этл логин чувачка, которому отправляется сообщение о стрелке
import { getStompClient, rootUrl } from './../common';
import { IChatReceivingMessage, IChatSendingMessage } from './interfaces';
import { ROOT, ONLINE_TRACKING, SECURITY, CHAT } from '../channels';
import { APP } from '../channels';
import Stomp from 'stompjs';
import { USER_PREFIX } from './../channels';
import { WRITING_TRACKING } from './../channels';
import { NOTIFICATION } from './../channels';

export const sendMessage = (to: string, message: IChatSendingMessage) => {
    getStompClient()?.send(ROOT + APP + "/chat.sendMessage/" + to, {}, JSON.stringify(message));
}


export const readMessagesFromChat = (from: number) => {
    getStompClient()?.send(ROOT + APP + "/chat.receiveMessage/" + from, {});
}


export const sendWritingStatusMessage = (to: string, writingStatus: boolean) => {
    getStompClient()?.send(ROOT + APP + "/chat.sendWritingStatusForUser/" + to, {}, JSON.stringify(writingStatus));
}









export const subscribeToOnlineTracking = (userLoginForTracking, onUserChangeStatus: (newStatus: boolean) => void) => {
    const onMessageReceived = (msg: Stomp.Message) => {
        const msgBody = JSON.parse(msg.body);
        const newStatus: boolean = msgBody["isOnline"];
        onUserChangeStatus(newStatus);
    } 
    return getStompClient()?.subscribe(SECURITY + ONLINE_TRACKING + "/"+userLoginForTracking, onMessageReceived );
}


export const subscribeToWritingTracking = (userLoginForTracking, onUserChangeWriting: (newStatus: boolean) => void) => {
    const onMessageReceived = (msg: Stomp.Message) => {
        const msgBody = JSON.parse(msg.body);
        onUserChangeWriting(msgBody );
    } 
    return getStompClient()?.subscribe(USER_PREFIX + SECURITY + WRITING_TRACKING + "/"+userLoginForTracking, onMessageReceived );
}


//Отслеживаю сообщения чатов
export const subscribeToChatMessagesTracking = (onChatMessageReceived: (message: IChatReceivingMessage) => void) => {
    const onMessageReceived = (msg: Stomp.Message) => {
        const msgBody: IChatReceivingMessage = JSON.parse(msg.body);
        onChatMessageReceived(msgBody);
    } 

    return getStompClient()?.subscribe(USER_PREFIX + SECURITY + CHAT, onMessageReceived);
}

//Отслеживаю появления новых чатов
export const subscribeToNewChatTracking = (onChatMessageReceived: (message: IChatReceivingMessage) => void) => {
    const onMessageReceived = (msg: Stomp.Message) => {
        const msgBody: IChatReceivingMessage = JSON.parse(msg.body);
        onChatMessageReceived(msgBody);
    } 

    return getStompClient()?.subscribe(USER_PREFIX + SECURITY + CHAT, onMessageReceived);
}

export const subscribeToNotificationsTracking = ( onNotificationReceived: (notification: any) => void ) => {
    const onMessageReceived = (msg: Stomp.Message) => {
        const msgBody: IChatReceivingMessage = JSON.parse(msg.body);
        onNotificationReceived(msgBody);
    } 

    return getStompClient()?.subscribe(USER_PREFIX + SECURITY + NOTIFICATION, onMessageReceived);
}