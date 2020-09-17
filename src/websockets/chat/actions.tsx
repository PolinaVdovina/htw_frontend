//to - этл логин чувачка, которому отправляется сообщение о стрелке
import { getStompClient, rootUrl } from './../common';
import { IChatReceivingMessage, IChatSendingMessage } from './interfaces';
import { ROOT, ONLINE_TRACKING, SECURITY, CHAT } from '../channels';
import { APP } from '../channels';
import Stomp from 'stompjs';
import { USER_PREFIX } from './../channels';

export const sendMessage = (to: string, message: IChatSendingMessage) => {
    getStompClient()?.send(ROOT + APP + "/chat.sendMessage/" + to, {}, JSON.stringify(message));
}

export const subscribeToOnlineTracking = (userLoginForTracking: string, onUserChangeStatus: (newStatus: boolean) => void) => {
    const onMessageReceived = (msg: Stomp.Message) => {
        const msgBody = JSON.parse(msg.body);
        const newStatus: boolean = msgBody["isOnline"];
        onUserChangeStatus(newStatus);
    } 
    return getStompClient()?.subscribe(SECURITY + ONLINE_TRACKING + "/"+userLoginForTracking, onMessageReceived );
}


export const subscribeToUserChat = (userLogin, onChatMessageReceived: (message: IChatReceivingMessage) => void) => {
    const onMessageReceived = (msg: Stomp.Message) => {
        const msgBody: IChatReceivingMessage = JSON.parse(msg.body);
        const newStatus: boolean = msgBody["isOnline"];
        onChatMessageReceived(msgBody);
    } 

    return getStompClient()?.subscribe(USER_PREFIX + SECURITY + CHAT, onMessageReceived);
}