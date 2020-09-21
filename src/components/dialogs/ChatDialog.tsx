import * as React from 'react';
import { ChatHeader } from './../chat/ChatHeader';
import { connect } from 'react-redux';
import { Dialog, useTheme } from '@material-ui/core';
import { RootState } from '../../redux/store';
import { useMediaQuery } from '@material-ui/core';
import { Chat, IChatProps } from './../chat/Chat';
import { stopLoading, startLoading } from './../../redux/reducers/dialog-reducers';


interface IChatDialogProps extends IChatProps {
    open: boolean,
    onClose: () => any,
    startLoading: typeof startLoading,
    stopLoading: typeof stopLoading,
}


const mapStateToProps = (state: RootState) => ({
    myLogin: state.authReducer.login,
    chatName: state.chatReducer.chatName,
    token: state.authReducer.token,
})

const mapDispatchToProps = {
    startLoading,
    stopLoading,
}


const ChatDialogWrap = (props: IChatDialogProps) => {
    const theme = useTheme();
    const {
        open,
        ...other
    } = props;
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    return (
        <Dialog
            
            fullScreen={fullScreen}
            fullWidth
            scroll="body"
            open={props.open}
            onClose={props.onClose}
            PaperProps={{
                style: {
                    position: fullScreen ? "fixed" : "inherit",
                    left: fullScreen ? 0 : "inherit",
                    top: 0,
                    height: fullScreen ?  "100%" : "85vh",
                    backgroundColor: theme.chat.chatPaperBackgroundColor
                }
            }}
        >
            <Chat
            {...other}/>
        </Dialog>
    )
}

export const ChatDialog = connect(mapStateToProps, mapDispatchToProps)(ChatDialogWrap)