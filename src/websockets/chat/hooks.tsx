import React from 'react';
import { subscribeToOnlineTracking, subscribeToWritingTracking, subscribeToChatMessagesTracking } from './actions';
import { getStompClient } from './../common';
import { isUserOnlineFetch, searchCriteriaFetch } from './../../utils/fetchFunctions';
import { IChatReceivingMessage } from './interfaces';
import { useDispatch } from 'react-redux';
import { startLoadingAction, stopLoadingAction } from './../../redux/actions/dialog-actions';
import { stopLoading } from './../../redux/reducers/dialog-reducers';
import { SortCriteriaDirection } from '../../utils/search-criteria/types';
import { sortCriteria } from '../../utils/search-criteria/builders';
import { pagination } from './../../utils/search-criteria/builders';

export function useWritingStatusTracking(targetUserLogin, isOnline) {
    const [isWriting, setWriting] = React.useState<boolean | null>(null);


    React.useEffect(() => {
        if (!targetUserLogin) {
            setWriting(null);
            return;
        }

        if (isOnline == false) {
            setWriting(false);
            return;
        }

        let writingTimer: NodeJS.Timeout;
        function onUserStartWrite(isWriting: boolean) {
            setWriting(isWriting);

            if (writingTimer)
                clearTimeout(writingTimer);
            if (isWriting) {
                writingTimer = setTimeout(
                    () => {
                        setWriting(false)
                    },
                    3000
                )
            }
        }

        const subscription = subscribeToWritingTracking(targetUserLogin, onUserStartWrite)
        return () => {
            if (subscription)
                getStompClient()?.unsubscribe(subscription.id);
        };
    }, []);

    return isWriting;
}


export function useOnlineStatusTracking(targetUserLogin, token) {
    const [isOnline, setOnline] = React.useState<boolean | null>(null);

    const fetchOnlineStatus = async () => {
        if (!token || !targetUserLogin)
            return;

        const fetch = await isUserOnlineFetch(token, targetUserLogin);

        if (fetch.result != null || fetch.result != undefined) {
            setOnline(fetch.result)
        }
        return fetch.result;
    }

    React.useEffect(() => {
        if (!targetUserLogin) {
            setOnline(null);
            return;
        }
        fetchOnlineStatus();
        function onUserChangeOnlineStatus(isWriting: boolean) {
            setOnline(isWriting);
        }
        const subscription = subscribeToOnlineTracking(targetUserLogin, onUserChangeOnlineStatus)
        return () => {
            if (subscription)
                getStompClient()?.unsubscribe(subscription.id);
        };
    }, []);

    return isOnline;
}

export const usePrivateChatTracking = (targetUserLogin, token, onChatMessageReceived:(message: IChatReceivingMessage) => void ) => {
    React.useEffect(() => {


        const subscription = subscribeToChatMessagesTracking(targetUserLogin, onChatMessageReceived)
        //fetchChatMessages();
        return () => {
            if (subscription)
                getStompClient()?.unsubscribe(subscription?.id);
        }
    }, []);

}

/* export const usePrivateChatMessages = (targetUserLogin, token):
    [IChatReceivingMessage[] | null, React.Dispatch<React.SetStateAction<IChatReceivingMessage[] | null>>] => {
    const [messages, setMessages] = React.useState<Array<IChatReceivingMessage> | null>([]);
    const dispatch = useDispatch();

    const fetchChatMessages = async () => {
        if (!token)
            return;
        await dispatch(startLoadingAction());
        const fetch = await searchCriteriaFetch<IChatReceivingMessage>("/chat/getPrivateMessages/" + targetUserLogin, token, {
            sortCriteria: [sortCriteria("createdDate", SortCriteriaDirection.DESC)],
            pagination: pagination(30, 1),
        });

        if (fetch.result)
            setMessages(fetch.result.reverse());
        await dispatch(stopLoadingAction());
        return fetch.result;
    }

    React.useEffect(() => {
        const onChatMessageReceived = (message: IChatReceivingMessage) => {
            setMessages((prevMessages) => {
                if (prevMessages)
                    return [...prevMessages, message]
                else
                    return [message]
            });
        }

        const subscription = subscribeToChatMessagesTracking(targetUserLogin, onChatMessageReceived)
        fetchChatMessages();
        return () => {
            if (subscription)
                getStompClient()?.unsubscribe(subscription?.id);
        }
    }, []);

    return [messages, setMessages];
} */