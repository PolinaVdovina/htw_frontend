import { IChatReceivingMessage, IChatSendingMessage } from '../../websockets/chat/interfaces';
import { RootState } from '../../redux/store';
import { connect, useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles, Paper, Grid, Typography, Avatar, Divider } from '@material-ui/core';
import React from 'react';
import { ChatMessage } from './ChatMessage';
import { useTheme } from '@material-ui/core';
import { ChatHeader } from './ChatHeader';
import { ChatBody } from './ChatBody';
import { ChatInput } from './ChatInput';
import { searchCriteriaFetch, isUserOnlineFetch } from './../../utils/fetchFunctions';
import { sortCriteria } from '../../utils/search-criteria/builders';
import { SortCriteriaDirection, SearchCriteriaOperation, ISearchCriteria } from '../../utils/search-criteria/types';
import { subscribeToChatMessagesTracking, sendMessage, subscribeToOnlineTracking, readMessagesFromChat } from './../../websockets/chat/actions';
import { getStompClient } from '../../websockets/common';
import Stomp from 'stompjs';
import { startLoading, stopLoading } from '../../redux/reducers/dialog-reducers';
import { useWritingStatusTracking, useOnlineStatusTracking, usePrivateChatTracking as usePrivateMessageTracking } from './../../websockets/chat/hooks';
import { pagination, searchCriteria } from './../../utils/search-criteria/builders';
import { resetUnreadMessagesForChatAction } from '../../redux/actions/chat-actions';



export interface IChatProps {
    messagesData?: Array<IChatReceivingMessage> | null,
    myLogin?: string | null,
    token?: string | null,
    chatName?: string | null,
    onClose?: () => any,
    viewName?: string | null,
    startLoading: typeof startLoading,
    stopLoading: typeof stopLoading,
    chatId?: number | null,
}


const mapStateToProps = (state: RootState) => ({
    myLogin: state.authReducer.login,
    chatName: state.chatReducer.chatName,
    token: state.authReducer.token,
    chatId: state.chatReducer.chatId,
    viewName: state.chatReducer.chatViewName,
})

const mapDispatchToProps = {
    startLoading,
    stopLoading,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootGrid: {
            height: "100%",
            flexWrap: "nowrap"
        },
    }),
);

const ChatWrap = (props: IChatProps) => {
    const [messages, setMessages] = React.useState<Array<IChatReceivingMessage>>([]);   //0 - это самое старое сообщение; 1 - предпоследнее и тд...
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const bodyRef = React.useRef<any>();

    const isCompanionOnline = useOnlineStatusTracking(props.chatName, props.token);
    const isCompanionWriting = useWritingStatusTracking(props.chatName, isCompanionOnline);

    const [tapeOver, setTapeOver] = React.useState(false);
    const [fetchCount, setFetchCount] = React.useState(0);
    const [getMessagesCount, setGetMessagesCount] = React.useState(0);  //Сколько раз получил сообщения в реальном времени через вебсокет

    let description: string | null = null;
    if (isCompanionWriting) {
        description = "печатает..."
    }
    else if (isCompanionOnline != null) {
        description = isCompanionOnline ? "В сети" : "Не в сети";

    }

    usePrivateMessageTracking((newMessage: IChatReceivingMessage) => {
        //Если отправитель - это собеседник и сообщение для моего логина
        //или
        //Если отправитель - это я и сообщение для собеседника
        //Тогда это тот чат, который нужно смотреть
        if ((newMessage.sender == props.chatName && newMessage.target == props.myLogin) || (newMessage.sender == props.myLogin && newMessage.target == props.chatName)) {

            setMessages(prevState => [...prevState, newMessage])
            setGetMessagesCount(old => old + 1);

            if (props.chatId) {
                readMessagesFromChat(props.chatId);
                //dispatch(resetUnreadMessagesForChatAction(newMessage.chatId))
                
            }
        }
    })

    React.useEffect(() => {
        //fetchChatMessages();

    }, [])

    const fetchMessagesOnPage = async (page: number) => {
        if (!props.token)
            return;
        let search: Array<ISearchCriteria> | null = null;
        if (messages.length > 0) {
            search = [searchCriteria("createdDate", messages[0].createdDate, SearchCriteriaOperation.LESS)];
        }
        searchCriteriaFetch<IChatReceivingMessage>("/chat/getPrivateMessages/" + props.chatName, props.token, {
            sortCriteria: [sortCriteria("createdDate", SortCriteriaDirection.DESC)],
            pagination: pagination(80, page)
        }).then(
            (e) => {
                if (props.chatId)
                    readMessagesFromChat(props.chatId);
                const newMessages = e.result;
                if (newMessages) {
                    if (newMessages.length < 20)
                        setTapeOver(true);
                    setMessages(oldMsgs => [...newMessages, ...oldMsgs].sort((a, b) => a.id - b.id));
                } else {
                    setTapeOver(true);
                }
            }
        );

    }

    const sendMessageHandler = async (msg: string) => {
        if (props.token) {
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
                description={description}
                title={props.viewName ? props.viewName : ""}
                onClose={props.onClose}
            />
            <Divider />
            <ChatBody
                fetchNext={fetchMessagesOnPage}
                isTapeOver={tapeOver}
                getMessagesCount={getMessagesCount}
                messagesData={messages} />
            <Divider />
            <ChatInput onSendButtonClick={sendMessageHandler} />

        </Grid>
    )
}

export const Chat = connect(mapStateToProps, mapDispatchToProps)(ChatWrap)