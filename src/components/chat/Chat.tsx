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
import { resetUnreadMessagesForChatAction, setChatsAction } from '../../redux/actions/chat-actions';
import { setOpenChatIdAction } from './../../redux/actions/chat-actions';
import { v4 as uuidv4 } from 'uuid';
import { initNotifications } from '../../redux/reducers/notification-reducers';
import { getUnreadMessagesCount } from './../../redux/reducers/chat-reducers';
import { IReceivingChatData } from './../../websockets/chat/interfaces';
import { setChatNotificationAction } from './../../redux/actions/notification-actions';



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
    chats?: IReceivingChatData[] | null,
}


const mapStateToProps = (state: RootState) => ({
    myLogin: state.authReducer.login,
    chatName: state.chatReducer.chatName,
    token: state.authReducer.token,
    chatId: state.chatReducer.chatId,
    viewName: state.chatReducer.chatViewName,
    chats: state.chatReducer.chats,
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
    const [sendingMessages, setSendingMessages] = React.useState<Array<IChatReceivingMessage>>([]); //Введенные сообщения, но еще не отправленные
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const bodyRef = React.useRef<any>();

    const isCompanionOnline = useOnlineStatusTracking(props.chatName, props.token);
    const isCompanionWriting = useWritingStatusTracking(props.chatName, isCompanionOnline);

    const [tapeOver, setTapeOver] = React.useState(false);
    const [fetchCount, setFetchCount] = React.useState(0);
    const [getMessagesCount, setGetMessagesCount] = React.useState(0);  //Сколько раз получил сообщения в реальном времени через вебсокет

    //ИДЕАЛЬноЕ НАЗВАНИЕ У СЕТЕРА
    const [setMessagesCount, setSetMessagesCount] = React.useState(0);  //Сколько раз отправил сообщения в реальном времени через вебсокет

    let description: string | null = null;
    if (isCompanionWriting) {
        description = "печатает..."
    }
    else if (isCompanionOnline != null) {
        description = isCompanionOnline ? "В сети" : "Не в сети";

    }

    usePrivateMessageTracking(async (newMessage: IChatReceivingMessage) => {
        //Если отправитель - это собеседник и сообщение для моего логина
        //или
        //Если отправитель - это я и сообщение для собеседника
        //Тогда это тот чат, который нужно смотреть
        if ((newMessage.sender == props.chatName && newMessage.target == props.myLogin) || (newMessage.sender == props.myLogin && newMessage.target == props.chatName)) {
            setMessages(prevState => [...prevState, newMessage].sort((a, b) => Date.parse(a.createdDate) - Date.parse(b.createdDate)))
            setGetMessagesCount(old => old + 1);

            if (props.chatId) {
                readMessagesFromChat(props.chatId);
                //dispatch(resetUnreadMessagesForChatAction(newMessage.chatId))
            } else {
                dispatch(setOpenChatIdAction(newMessage.chatId));
                await readMessagesFromChat(newMessage.chatId);
                //await dispatch(initNotifications())
            }
      
            //setSendingMessages(old => old.length > 0 ? old.splice(0,1) : [])
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
                    setMessages(oldMsgs => [...newMessages, ...oldMsgs].sort((a, b) => Date.parse(a.createdDate) - Date.parse(b.createdDate)));
                } else {
                    setTapeOver(true);
                }
            }
        );

    }

    const sendMessageHandler = async (msg: string) => {
        if (props.token) {
            const msgParsed: IChatSendingMessage = { content: msg }
            if (props.chatName) {
                const msgData: IChatReceivingMessage & { isFake?: boolean } = {
                    content: msg,
                    id: uuidv4(),
                    target: props.chatName,
                    chatId: props.chatId ? props.chatId : uuidv4(),
                    createdDate: (new Date()).getUTCDate().toString(),
                    sender: props.myLogin ? props.myLogin : "",
                    senderViewName: props.myLogin ? props.myLogin : "",
                    isFake: true,
                }
                setSendingMessages(old => [...old, msgData])
                setSetMessagesCount(old => old + 1);
                sendMessage(props.chatName, msgParsed);
            }

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
                setMessagesCount={setMessagesCount}
                messagesData={[...messages, ...sendingMessages.slice(getMessagesCount, sendingMessages.length)]} />
            <Divider />
            <ChatInput onSendButtonClick={sendMessageHandler} />

        </Grid>
    )
}

export const Chat = connect(mapStateToProps, mapDispatchToProps)(ChatWrap)