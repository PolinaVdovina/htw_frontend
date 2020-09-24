import { Grid, TextField, IconButton, Tooltip, useTheme, Divider, Typography, Avatar } from "@material-ui/core"
import * as React from 'react';
import { ChatMessage } from './ChatMessage';
import SendIcon from '@material-ui/icons/Send';
import { connect } from 'react-redux';
import { RootState } from "../../../redux/store";
import { SharpCorner } from "./chatEnums";
import { getAvatarUrl, searchCriteriaFetch } from '../../../utils/fetchFunctions';
import { isWhitespace } from "../../../utils/validateFunctions";
import { sendMessage, subscribeToChatMessagesTracking } from '../../../websockets/chat/actions';
import { IChatReceivingMessage, IChatSendingMessage } from '../../../websockets/chat/interfaces';
import Stomp from 'stompjs';
import { getStompClient } from '../../../websockets/common';
import { sortCriteria } from "../../../utils/search-criteria/builders";
import { SortCriteriaDirection } from "../../../utils/search-criteria/types";

export interface IChatForm {
    messagesData?: Array<IChatReceivingMessage> | null,
    myLogin?: string | null,
    hideNames?: boolean,
    avatarUID?: any,
    height?: any,
    chatName?: string | null,
    token?: string | null,
}

interface IStyledChatMessageProps {
    myLogin?: string | null,
    avatarUID?: any
    messageData: IChatReceivingMessage,
    prevMessageData?: IChatReceivingMessage | null,
    hideNames?: boolean,
    showAvatars?: boolean,

}

const StyledChatMessageWrap = (props: IStyledChatMessageProps) => {
    const theme = useTheme();
    const isMine = props.messageData.sender == props.myLogin;
    const viewName = (props.hideNames || isMine || (props.prevMessageData && props.prevMessageData.senderViewName == props.messageData.senderViewName)) ? "" : props.messageData.senderViewName;
    return (
        <Grid
            alignItems="flex-end"
            container
            direction="row"
            style={{
                width: "initial",
                maxWidth: "90%",
                alignSelf: isMine ? "flex-end" : "flex-start",
                minWidth: "35%",
                marginTop: (props.prevMessageData && props.prevMessageData.sender != props.messageData.sender) ? theme.spacing(1) : 0,
                marginBottom: theme.spacing(1),
            }}
        >
            {
                !isMine && props.showAvatars &&
                <Avatar
                    style={{
                        marginRight: theme.spacing(1),
                        height: (props.prevMessageData && props.prevMessageData.sender == props.messageData.sender) ? 0 : "34px",
                        width: "34px"
                    }}
                    src={getAvatarUrl(props.messageData.sender) + ("?" + props.avatarUID)}
                />
            }
            <ChatMessage
                key={props.messageData.id}
                backgroundColor={isMine ? theme.chat.ownMessageBackgroundColor : theme.chat.ownMessageColor}
                messageColor={isMine ? theme.chat.ownMessageColor : theme.chat.companionMessageColor}
                titleColor={isMine ? theme.chat.ownMessageTitleColor : theme.chat.companionMessageTitleColor}
                sharpCorner={isMine ? SharpCorner.RIGHT : SharpCorner.LEFT}
                style={{
                    alignSelf: isMine ? "flex-end" : "flex-start",
                    flexGrow: 1,
                    marginTop: (props.prevMessageData && props.prevMessageData.sender != props.messageData.sender) ? theme.spacing(1) : 0
                }}

                showAvatar={true}
                messageData={{
                    ...props.messageData,
                    senderViewName: viewName,
                }}
            />

        </Grid>
    )
}


export const StyledChatMessage = connect((state: RootState) => ({
    myLogin: state.authReducer.login,
    avatarUID: state.userPersonalsReducer.avatarUrlUid,
}))(StyledChatMessageWrap)


const ChatFormWrap = (props: IChatForm) => {
    const subscriptionRef = React.useRef<Stomp.Subscription | null>(null);
    const [chatMessages, setChatMessages] = React.useState<Array<IChatReceivingMessage>>([]);

    const onChatMessageReceived = (message: IChatReceivingMessage) => {
        alert(JSON.stringify(chatMessages))
        setChatMessages((prevMessages) => [...prevMessages, message]);
    }

    const fetchMessages = async() => {
        if(props.token) {
            const fetch = await searchCriteriaFetch<IChatReceivingMessage>("/chat/getPrivateMessages/"+props.chatName, props.token, {
                sortCriteria: [sortCriteria("createdDate", SortCriteriaDirection.ASC )]
            });
            alert(JSON.stringify(fetch.result))
            if(fetch.result)
                setChatMessages(fetch.result);
        }
    }

    React.useEffect(() => {
        const subscription: Stomp.Subscription | undefined = subscribeToChatMessagesTracking(onChatMessageReceived);
        if (subscription)
            subscriptionRef.current = subscription
        fetchMessages();
        return () => {
            if (subscription)
                getStompClient()?.unsubscribe(subscription?.id);
        }
    }, [])



    const theme = useTheme();
    const mainColor = theme.palette.primary.main ? theme.palette.primary.main : "inherit";
    const [message, setMessage] = React.useState("");
    const sendButtonClick = () => {
        if (!isWhitespace(message)) {
        
            sendMessageHandler(message);
        }
    }

    const sendMessageHandler = (msg: string) => {
        const msgParsed: IChatSendingMessage = { content: msg }
        if (props.chatName)
            sendMessage(props.chatName, msgParsed);
        //alert("Ты говно");
        setMessage("");
    }

    return (
        <Grid container direction="column" style={{ height: props.height, color: "white" }}>
            <Grid container direction="column" style={{
                flexGrow: 1,
                padding: theme.spacing(1),
                overflowY: "auto",
                flexWrap: "nowrap",
                flexBasis: 0,
            }}>
                {
                    chatMessages?.map((messageData, index) => {
                        const isMine = messageData.sender == props.myLogin;
                        const prevMessage = chatMessages && (index > 0) ? chatMessages[index - 1] : null;
                        const messageDataNotNull: IChatReceivingMessage = messageData; //чтобы тайпскрит на нулл не выпендривался
                        return (
                            <StyledChatMessageWrap
                                myLogin={props.myLogin}
                                messageData={messageDataNotNull}
                                prevMessageData={prevMessage}
                                avatarUID={props.avatarUID}
                                showAvatars={true}
                            />
                        )
                    })
                }
                {
                    //Без этой херни внизу не будет отступа и последнее сообщение прилепает к низу, мдя
                }
                <Grid container item >
                    <Grid item style={{ height: theme.spacing(1) }}></Grid>
                </Grid>

            </Grid>

            <Divider />
            <Grid
                item container
                alignItems="center"
                direction="row"
                style={{ backgroundColor: "white", flexWrap: "nowrap" }}>
                <TextField
                    onChange={(event) => setMessage(event.target.value)}
                    value={message}
                    onKeyDown={(event) => event.key === 'Enter' && sendButtonClick()}
                    autoFocus={true}
                    style={{ flexGrow: 1, borderRadius: 0, backgroundColor: "white", paddingLeft: theme.spacing(2) }}
                    size="small"
                    InputProps={{ disableUnderline: true }}
                />
                <Tooltip
                    color="primary"
                    title="Отправить сообщение"
                >
                    <IconButton onClick={sendButtonClick}>
                        <SendIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Grid>
    )
}

export const ChatForm = connect((state: RootState) => ({
    myLogin: state.authReducer.login,
    avatarUID: state.userPersonalsReducer.avatarUrlUid,
    chatName: state.chatReducer.chatName,
    token: state.authReducer.token
}))(ChatFormWrap)