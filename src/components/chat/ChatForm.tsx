import { Grid, TextField, IconButton, Tooltip, useTheme, Divider, Typography, Avatar } from "@material-ui/core"
import * as React from 'react';
import { IChatMessageData, ChatMessage } from './ChatMessage';
import SendIcon from '@material-ui/icons/Send';
import { connect } from 'react-redux';
import { RootState } from "../../redux/store";
import { SharpCorner } from "./chatEnums";
import { getAvatarUrl } from './../../utils/fetchFunctions';

interface IChatForm {
    messagesData?: Array<IChatMessageData> | null,
    myLogin?: string | null,
    hideNames?: boolean,
    avatarUID?: any
}

interface IStyledChatMessageProps {
    myLogin?: string | null,
    avatarUID?: any
    messageData: IChatMessageData,
    prevMessageData?: IChatMessageData | null,
    hideNames?: boolean,
    showAvatars?: boolean
}

const StyledChatMessageWrap = (props: IStyledChatMessageProps) => {
    const theme = useTheme();
    const isMine = props.messageData.ownerLogin == props.myLogin;
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
                marginTop: (props.prevMessageData && props.prevMessageData.ownerLogin != props.messageData.ownerLogin) ? theme.spacing(1) : 0,
                marginBottom: theme.spacing(1),
            }}
        >
            {
                !isMine && props.showAvatars &&
                <Avatar
                    style={{
                        marginRight: theme.spacing(2),
                        height: (props.prevMessageData && props.prevMessageData.ownerLogin == props.messageData.ownerLogin) ? 0 : "42px",
                        width: "42px"
                    }}
                    src={getAvatarUrl(props.messageData.ownerLogin) + ("?" + props.avatarUID)}
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
                    marginTop: (props.prevMessageData && props.prevMessageData.ownerLogin != props.messageData.ownerLogin) ? theme.spacing(1) : 0
                }}
                {...props.messageData}
                showAvatar={true}
                ownerViewName={props.hideNames || isMine ? null : props.messageData.ownerViewName}
            />

        </Grid>
    )
}


export const StyledChatMessage = connect((state: RootState) => ({
    myLogin: state.authReducer.login,
    avatarUID: state.userPersonalsReducer.avatarUrlUid,
}))(StyledChatMessageWrap)


const ChatFormWrap = (props: IChatForm) => {
    const theme = useTheme();
    const mainColor = theme.palette.primary.main ? theme.palette.primary.main : "inherit";
    
    const startSendMessage = () => {
        alert("Ты говно");
    }


    return (
        <Grid container direction="column" style={{ height: "100%", color: "white" }}>
            <Grid
                item
                container
                direction="row"
                alignItems="center"
                style={{ backgroundColor: theme.palette.primary.main, padding: theme.spacing(1) }}>
                <Grid item>
                    <Avatar style={{ marginRight: theme.spacing(1) }} />
                </Grid>
                <Typography variant="h6" style={{ textAlign: "center", }}>
                    Даунёнки
                </Typography>
            </Grid>
            <Grid container direction="column" style={{
                flexGrow: 1,
                padding: theme.spacing(2),
                overflowY: "auto",
                flexWrap: "nowrap",
                
            }}>
                {
                    props.messagesData?.map((messageData, index) => {
                        const isMine = messageData.ownerLogin == props.myLogin;
                        const prevMessage = props.messagesData && (index > 0) ? props.messagesData[index - 1] : null;
                        const messageDataNotNull: IChatMessageData = messageData; //чтобы тайпскрит на нулл не выпендривался
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
            </Grid>
            <Divider />
            <Grid
                item container
                alignItems="center"
                direction="row"
                style={{ backgroundColor: "white" }}>
                <TextField
                    autoFocus={true}
                    style={{ flexGrow: 1, borderRadius:0, backgroundColor: "white", paddingLeft: theme.spacing(2)  }}
                    size="small"
                    InputProps={{ disableUnderline: true }}
                />
                <Tooltip
                    color="primary"
                    title="Отправить сообщение"
                >
                    <IconButton onClick = {startSendMessage}>
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
}))(ChatFormWrap)