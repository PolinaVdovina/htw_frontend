import React from 'react'

import { BodyElementCompProps } from './post-body-element';
import { useTheme, Link } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { IReceivingChatData } from './../../../../websockets/chat/interfaces';
import { openChat, showChat } from './../../../../redux/reducers/chat-reducers';
import { connect } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useDispatch } from 'react-redux';
import { readMessagesFromChat } from '../../../../websockets/chat/actions';

interface IChat  {
    name: string,
    messageCount: number
}

interface IChatLinksInPost extends BodyElementCompProps  {
    openChat: typeof openChat,
    data: {
        chats: Array<IReceivingChatData>,
        messageCount: number,
    }
}

const mapStateToProps = (state: RootState) => {
    return {

    }
} 

const mapDispatchToProps =  {
    openChat
}


const ChatLinksInPostWrap = (props: IChatLinksInPost) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const openChatHandler = async (chat: IReceivingChatData) => {
        await dispatch(showChat(chat.interlocutorLogin, chat.name, chat.id))
        //props.openChat(chat.interlocutorLogin, chat.name);
        //readMessagesFromChat(chat.id);
    }

    return (
        <div>
            {
                props.data.chats.length == 1 &&
                <Typography>
                    Пользователь <Link style={{cursor: "pointer"}} onClick={()=>openChatHandler(props.data.chats[0])}>{props.data.chats[0].name}</Link> оставил вам сообщени{props.data.messageCount > 1 ? "я" : "е"}
                </Typography>
            }
            {
                (props.data.chats.length > 1) && (props.data.chats.length < 10) &&
                <Typography>
                    Пользователи{props.data.chats.map( chat => <Link  style={{cursor: "pointer"}} onClick={()=>openChatHandler(props.data.chats[0])}> {chat.name}</Link> )} оставили вам сообщения;
                </Typography>
            }
            {
                props.data.chats.length >= 10 &&
                <Typography>
                    У вас очень много непрочитанных чатов (${ props.data.chats.length })
                </Typography>
            }
        </div>
    )
} 

export const ChatLinksInPost = connect(mapStateToProps, mapDispatchToProps)(ChatLinksInPostWrap);