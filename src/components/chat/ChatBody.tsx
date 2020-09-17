import { IChatReceivingMessage } from './../../websockets/chat/interfaces';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { makeStyles, Theme, createStyles, Paper, Grid, Typography, Avatar } from '@material-ui/core';
import React from 'react';
import { ChatMessage, ChatMessageColorScheme } from './ChatMessage';
import { useTheme } from '@material-ui/core';
import { getAvatarUrl } from './../../utils/fetchFunctions';


interface IChatBodyProps {
    messagesData?: Array<IChatReceivingMessage> | null,
    myLogin?: string | null,
    avatarUID?: any,
}


const mapStateToProps = (state: RootState) => ({
    myLogin: state.authReducer.login,
    avatarUID: state.userPersonalsReducer.avatarUrlUid
})

const avatarSize = "32px"
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootGrid: {
            flexGrow: 1,
            padding: theme.spacing(1),
            overflowY: "auto",
            flexWrap: "nowrap",
            flexBasis: 0,
            backgroundColor: theme.chat.chatPaperBackgroundColor
        },
        messageGrid: {
            minWidth: "35%",
            alignItems: "end",
            flexWrap: "nowrap",
            width: "max-content"
        },
        myMessagePaper: {
            backgroundColor: theme.chat.ownMessageBackgroundColor,
        },
        companionPaper: {
            backgroundColor: theme.chat.companionMessageBackgroundColor,
        },
        avatar: {
            width: "32px",
            height: "32px",
            marginRight: theme.spacing(1)
        },
    }),
);

const ChatBodyWrap = (props: IChatBodyProps) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Grid
            container
            direction="column"
            className={classes.rootGrid}
        >
            {
                props.messagesData?.map((messageData, index) => {
                    const isMine = messageData.sender == props.myLogin;
                    const isNotLastMessage = (props.messagesData &&
                        props.messagesData.length > 1 &&
                        index + 1 < props.messagesData.length);
                    const isNotFirstMessage = (props.messagesData &&
                        props.messagesData.length > 1 &&
                        index > 0);

                    const prevMsg: IChatReceivingMessage | null = props.messagesData && isNotFirstMessage ? props.messagesData[index - 1] : null;
                    const nextMsg: IChatReceivingMessage | null = props.messagesData && isNotLastMessage ? props.messagesData[index + 1] : null;
                    const isLastUserMessage = !(nextMsg && messageData.sender == nextMsg.sender)  //Начинаются ли после данного сообщения сообщения другого пользователя
                    const isFirstUserMessage = !(prevMsg && messageData.sender == prevMsg.sender)  //... перед этим сообщением идет сообщение другого пользователя?
                    const roundedStyles: React.CSSProperties = {};
                    if (isLastUserMessage) {
                        if (isMine)
                            roundedStyles.borderBottomLeftRadius = theme.spacing(2);
                        else
                            roundedStyles.borderBottomRightRadius = theme.spacing(2);
                    }
                    return (
                        <Grid
                            key={messageData.id}
                            container
                            style={{
                                marginBottom: isLastUserMessage ? theme.spacing(2) : theme.spacing(1),
                                alignSelf: isMine ? "end" : "start"
                            }}
                            className={classes.messageGrid}
                            direction={isMine ? "row-reverse" : "row"}
                        >
                            {
                                !isMine &&
                                <Grid item>
                                    <Avatar
                                        src={getAvatarUrl(messageData.sender)+"?"+props.avatarUID }
                                        className={isLastUserMessage ? classes.avatar : classes.avatar}
                                        style={{
                                            height: isLastUserMessage ? avatarSize : 0,
                                        }}
                                    />
                                </Grid>
                            }
                            <ChatMessage
                                hideViewName={!isFirstUserMessage || isMine}
                                messageData={messageData}
                                chatMessageColorScheme={isMine ? ChatMessageColorScheme.MINE : ChatMessageColorScheme.NOT_MINE}
                                paperStyle={{
                                    flexGrow: 1,
                                    ...roundedStyles
                                }}
                            />
                        </Grid>
                    )
                })
            }
            
            {/* Без этой херни внизу не будет отступа и последнее сообщение прилепает к низу, мдя */}
            <Grid container item >
                <Grid item style={{ height:1 }}></Grid>
            </Grid>
        </Grid>
    )
}

export const ChatBody = connect(mapStateToProps)(ChatBodyWrap)