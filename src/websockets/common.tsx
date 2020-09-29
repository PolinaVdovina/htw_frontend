import SockJS from 'sockjs-client';
import Stomp, { Frame } from 'stompjs'
import { ROOT, END_POINT } from './channels';

let webSocket: WebSocket | null;
let stompClient: Stomp.Client | null;


export const rootUrl = "/websocket";
export const getWebSocket = () => webSocket;
export const getStompClient = () => {
    if (webSocket && stompClient && stompClient.connected)
        return stompClient;
    else
        return null;
}

export const stopWebsocketConnection = async () => new Promise((resolve, reject) => {
    if (isConnectedToWebsocket())
        stompClient?.disconnect(() => { resolve(); })
})


export const isConnectedToWebsocket = () => {
    return (webSocket && stompClient && stompClient.connected)
}


export const startWebsocketConnection = (token: string, onConnectedEvent, onErrorEvent?) => {
    return new Promise((resolve, reject) => {
        const errorTimer = setTimeout(() => {
            onErrorEvent();
            reject();
        },
            15000);

        const connectEventWrapper = (c?: Stomp.Frame) => {
            clearTimeout(errorTimer);
            onConnectedEvent();

            resolve();
        }
        const errorEventWrapper = (e?: string | Frame) => {
            clearTimeout(errorTimer);
            onErrorEvent();
            reject();
        }
        stopWebsocketConnection();
        webSocket = new SockJS(ROOT + END_POINT + "?token=" + token);
        webSocket.onopen = () => clearTimeout(errorTimer);
        stompClient = Stomp.over(webSocket);
     
        stompClient.connect({}, connectEventWrapper, errorEventWrapper);
    });

}





