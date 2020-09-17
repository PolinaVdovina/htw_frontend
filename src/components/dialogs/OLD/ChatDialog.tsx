/* import * as React from 'react';
import { Dialog, useTheme, Grid, DialogTitle, Typography, IconButton, Divider, Avatar } from '@material-ui/core';
import { AppMenu } from '../app-menu/AppMenu';
import CloseIcon from '@material-ui/icons/Close';
import SockJS from 'sockjs-client'
import { getStompClient, rootUrl } from './../../websockets/common';
import Stomp from 'stompjs';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { subscribeToOnlineTracking } from '../../websockets/chat/actions';
import { subscribeToUserChat } from './../../websockets/chat/actions';
import { IChatReceivingMessage } from './../../websockets/chat/interfaces';
interface IChatDialogProps extends IChatForm {
    open: boolean,
    paperStyle?: React.CSSProperties
    fullScreen?: boolean
    onClose?: () => any,
    children?: any,
    title?: string,
    messagesData?: Array<IChatReceivingMessage>,
    chatName?: string | null,
}

const ChatDialogWrap = (props: IChatDialogProps) => {
    
    const theme = useTheme();
    return (
        <Dialog
            fullScreen={props.fullScreen}
            fullWidth
            scroll="paper"
            open={props.open}
            onClose={props.onClose}
            PaperProps={{
                style: {
                    backgroundColor: theme.chat.chatPaperBackgroundColor
                }
            }}
        >
            <DialogTitle
                style={{
                    marginBottom: 0,
                    padding: theme.spacing(0),
                    paddingLeft: theme.spacing(1),
                    backgroundColor: theme.palette.primary.main,

                }}
            >
                <Grid
                    container
                    alignItems="center"
                    style={{ padding: 0, height: theme.menuBar.height, }}
                >
                    <Avatar style={{marginRight: theme.spacing(1)}} />
                    <Typography style={{ fontWeight: "bold", flexGrow: 1, color: "white" }}>
                        {props.title}
                    </Typography>
                    <IconButton onClick={props.onClose} style={{ color: "white" }}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </DialogTitle>

            <ChatForm
                height={props.fullScreen ? "100%" : "70vh"}
                messagesData={props.messagesData}
            />
        </Dialog>
    )
}

export const ChatDialog = connect(
    (state: RootState) => (
        {
            chatName: state.chatReducer.chatName,
        }
    )
)(ChatDialogWrap) */

export const i = 1