import * as React from 'react';
import { makeStyles, Theme, createStyles, Paper, useTheme, useMediaQuery } from '@material-ui/core';
import { RegRoleCard } from '../../components/cards/RegRoleCard';
import { HCenterizingGrid } from './../grid-containers/HCenterizingGrid';
import { RedirectIfNotAuthorized } from './../../components/redirects/RedirectIfNotAuthorized';
import { ChatForm } from './../../components/chat/ChatForm';
import { IChatMessageData } from './../../components/chat/ChatMessage';
import { PaddingPaper } from './../../components/cards/PaddingPaper';
import { MessageType } from '../../components/chat/chatEnums';
import { ChatDialog } from '../../components/dialogs/ChatDialog';
import { DialogWithAppBar } from '../../components/dialogs/DialogWithAppBar';
import { AppMenu } from '../../components/app-menu/AppMenu';
import CloseIcon from '@material-ui/icons/Close';


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

export const Chat = (props: IChatProps) => {
    const theme = useTheme();
    const [chatOpen, setChatOpen] = React.useState(true);
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    //const classes = useStyles();
    return (
        <HCenterizingGrid fullHeight>
            {/* <Paper style={{flexGrow:1, backgroundColor:theme.chat.chatPaperBackgroundColor, overflow: "hidden"}}>
                <ChatForm messagesData={testMessages}/>
            </Paper> */}
            {/*             <DialogWithAppBar
                onClose={()=>setChatOpen(false)}
                open={chatOpen}
                paperStyle={{ backgroundColor: "#edeef0"  }}
                title="Чат с дауненком"
                fullScreen={fullScreen}

            > */}

            {/*  <ChatForm messagesData={testMessages} /> */}

            {/*             </DialogWithAppBar> */}
            <ChatDialog
                onClose={() => setChatOpen(false)}
                fullScreen={fullScreen}
                messagesData={testMessages}
                title="Чат"
                open={chatOpen}
            />
        </HCenterizingGrid>
    )
}