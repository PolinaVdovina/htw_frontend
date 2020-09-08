import * as React from 'react';
import { makeStyles, Theme, createStyles, Paper, useTheme } from '@material-ui/core';
import { RegRoleCard } from '../../components/cards/RegRoleCard';
import { HCenterizingGrid } from './../grid-containers/HCenterizingGrid';
import { RedirectIfNotAuthorized } from './../../components/redirects/RedirectIfNotAuthorized';
import { ChatForm } from './../../components/chat/ChatForm';
import { IChatMessageData } from './../../components/chat/ChatMessage';
import { PaddingPaper } from './../../components/cards/PaddingPaper';
import { MessageType } from '../../components/chat/chatEnums';

interface IChatProps {
    
}

const testMessages: Array<IChatMessageData> = [
    {
        message: "Привет, друг",
        messageType: MessageType.TEXT,
        ownerLogin: "3",
        id: 1,
        ownerViewName: "Даунёнок",
        createdDate: "2019-11-12"
    },
    {
        message: "Привет, дебил",
        messageType: MessageType.TEXT,
        ownerLogin: "2",
        id: 2,
        ownerViewName: "Даунёнок",
        createdDate: "2019-12-12"
    },
    {
        message: "Привет, дебил",
        messageType: MessageType.TEXT,
        ownerLogin: "2",
        id: 2,
        ownerViewName: "Даунёнок",
        createdDate: "2019-12-12"
    },
    {
        message: "Привет, дебил",
        messageType: MessageType.TEXT,
        ownerLogin: "5",
        id: 2,
        ownerViewName: "Умняга",
        createdDate: "2019-12-12"
    },
    {
        message: "Привет, дебил",
        messageType: MessageType.TEXT,
        ownerLogin: "2",
        id: 2,
        ownerViewName: "Даунёнок",
        createdDate: "2019-12-12"
    },
    {
        message: "Привет, дебил",
        messageType: MessageType.TEXT,
        ownerLogin: "2",
        id: 2,
        ownerViewName: "Даунёнок",
        createdDate: "2019-12-12"
    },
    {
        message: "Привет, дебил",
        messageType: MessageType.TEXT,
        ownerLogin: "2",
        id: 2,
        ownerViewName: "Даунёнок",
        createdDate: "2019-12-12"
    },
    {
        message: "Привет, дебил",
        messageType: MessageType.TEXT,
        ownerLogin: "2",
        id: 2,
        ownerViewName: "Даунёнок",
        createdDate: "2019-12-12"
    },
    {
        message: "Привет, дебил",
        messageType: MessageType.TEXT,
        ownerLogin: "2",
        id: 2,
        ownerViewName: "Даунёнок",
        createdDate: "2019-12-12"
    },
    {
        message: "Привет, дебил",
        messageType: MessageType.TEXT,
        ownerLogin: "2",
        id: 2,
        ownerViewName: "Даунёнок",
        createdDate: "2019-12-12"
    }
]

export const Chat = (props : IChatProps) => {
    const theme = useTheme();
    //const classes = useStyles();
    return (
        <HCenterizingGrid fullHeight>
            <Paper style={{flexGrow:1, backgroundColor:theme.chat.chatPaperBackgroundColor, overflow: "hidden"}}>
                <ChatForm messagesData={testMessages}/>
            </Paper>
        </HCenterizingGrid>
    )
}