import { IChatReceivingMessage, IChatSendingMessage } from '../../websockets/chat/interfaces';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { makeStyles, Theme, createStyles, Paper, Grid, Typography, Avatar, Divider } from '@material-ui/core';
import React from 'react';
import { ChatMessage } from './ChatMessage';
import { useTheme } from '@material-ui/core';
import { ChatHeader } from './ChatHeader';
import { ChatBody } from './ChatBody';
import { ChatInput } from './ChatInput';
import { searchCriteriaFetch } from './../../utils/fetchFunctions';
import { sortCriteria } from '../../utils/search-criteria/builders';
import { SortCriteriaDirection } from '../../utils/search-criteria/types';
import { subscribeToUserChat, sendMessage } from './../../websockets/chat/actions';
import { getStompClient } from '../../websockets/common';
import Stomp from 'stompjs';
import { startLoading, stopLoading } from '../../redux/reducers/dialog-reducers';


export interface IChatProps {
    messagesData?: Array<IChatReceivingMessage> | null,
    myLogin?: string | null,
    token?: string | null,
    chatName?: string | null,
    onClose?: () => any,
    viewName?: string | null,
    startLoading: typeof startLoading,
    stopLoading: typeof stopLoading,
}


const mapStateToProps = (state: RootState) => ({
    myLogin: state.authReducer.login,
    chatName: state.chatReducer.chatName,
    token: state.authReducer.token,
    viewName: state.chatReducer.chatViewName,
})

const mapDispatchToProps = {
    startLoading,
    stopLoading,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootGrid: {
            height: "100vh",
            flexWrap: "nowrap"
        },
    }),
);

const ChatWrap = (props: IChatProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const [messages, setMessages] = React.useState<Array<IChatReceivingMessage>>([]);
    const subscriptionRef = React.useRef<Stomp.Subscription | null>(null);
    
    const fetchMessages = async() => {
        if(props.token) {
            await props.startLoading();
            const fetch = await searchCriteriaFetch<IChatReceivingMessage>("/chat/getPrivateMessages/"+props.chatName, props.token, {
                sortCriteria: [sortCriteria("createdDate", SortCriteriaDirection.ASC )]
            });
            //alert(JSON.stringify(fetch.result))
            if(fetch.result)
                setMessages(fetch.result);
            await props.stopLoading();
        }
    }

    const onChatMessageReceived = (message: IChatReceivingMessage) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    }


    React.useEffect(() => {
        const subscription: Stomp.Subscription | undefined = subscribeToUserChat(props.chatName, onChatMessageReceived);
        if (subscription)
            subscriptionRef.current = subscription
        fetchMessages();
        return () => {
            if (subscription)
                getStompClient()?.unsubscribe(subscription?.id);
        }
    }, [])

    const sendMessageHandler = async (msg: string) => {
        if (props.token) {
            const url = "/chat/getPrivateMessages/" + props.chatName;
            const fetch = await searchCriteriaFetch<IChatReceivingMessage>(url, props.token, {
                sortCriteria: [sortCriteria("createdDate", SortCriteriaDirection.ASC)]
            });

            const msgParsed: IChatSendingMessage = { content: msg }
            if (props.chatName)
                sendMessage(props.chatName, msgParsed);
        }
    }

    return (
        <Grid
            container
            direction="column"
            className={classes.rootGrid}
        >
            <ChatHeader
                title={props.viewName ? props.viewName : ""}
                onClose={props.onClose}
            />
            <ChatBody messagesData={messages} />
            <Divider />
            <ChatInput onSendButtonClick={sendMessageHandler} />

        </Grid>
    )
}

export const Chat = connect(mapStateToProps, mapDispatchToProps)(ChatWrap)