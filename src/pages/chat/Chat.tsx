import * as React from 'react';
import { makeStyles, Theme, createStyles, Paper, useTheme, useMediaQuery } from '@material-ui/core';
import { RegRoleCard } from '../../components/cards/RegRoleCard';
import { HCenterizingGrid } from './../grid-containers/HCenterizingGrid';
import { RedirectIfNotAuthorized } from './../../components/redirects/RedirectIfNotAuthorized';
import { ChatForm } from '../../components/chat/OLD/ChatForm';

import { PaddingPaper } from './../../components/cards/PaddingPaper';
import { MessageType } from '../../components/chat/OLD/chatEnums';

import { DialogWithAppBar } from '../../components/dialogs/DialogWithAppBar';
import { AppMenu } from '../../components/app-menu/AppMenu';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
import { rootUrl, getStompClient } from './../../websockets/common';

interface IChatProps {
    token?: string | null
}


const ChatWrap = (props: IChatProps) => {
    const theme = useTheme();
    const [chatOpen, setChatOpen] = React.useState(true);
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    //const classes = useStyles();
    return (
        <HCenterizingGrid fullHeight>
 
{/*             <ChatDialog
                onClose={() => setChatOpen(false)}
                messagesData={testMessages}
                title="Чат"
                open={chatOpen}
            />
 */}
        </HCenterizingGrid>
    )
}

export const Chat = connect(
    (state: RootState) => ({
        token: state.authReducer.token,
    })
)(ChatWrap)