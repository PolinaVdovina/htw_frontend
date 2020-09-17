import React from 'react';
import { IChatReceivingMessage } from './../../websockets/chat/interfaces';
import { Paper, makeStyles, createStyles, Theme, Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTheme } from '@material-ui/core';


export enum ChatMessageColorScheme {
    MINE,
    NOT_MINE
}

interface IChatMessageProps {
    paperStyle?: React.CSSProperties,
    messageData: IChatReceivingMessage,
    chatMessageColorScheme?: ChatMessageColorScheme | null,
    hideViewName?: boolean,
    classes?: typeof useStyles
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootGrid: {
            alignItems: "center",
            padding: 0,
            height: theme.menuBar.height,
            /* backgroundColor: theme.palette.primary.main, */
        },
        paper: {
            padding: theme.spacing(1),
        },
        viewName: {
            overflowWrap: "anywhere",
            fontSize: "12px",
            /*             color: props.titleColor ? props.titleColor : "inherit", */
        },
        messageText: {
            overflowWrap: "anywhere",
            wordBreak: "break-word",
            fontSize: "14px",
            /*             color: props.messageColor ? props.messageColor : "inherit" */
        }
    }),
);

const mapStateToProps = (state: RootState) => ({

})

const ChatMessageWrap = (props: IChatMessageProps) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Paper
            elevation={3}
            className={classes.paper}
            style={{
                backgroundColor: props.chatMessageColorScheme == ChatMessageColorScheme.MINE ?
                    theme.chat.ownMessageBackgroundColor : theme.chat.companionMessageBackgroundColor,
                ...props.paperStyle
            }}
        >
            <Grid
                container
                direction="column"
            >
                {
                    props.messageData.senderViewName && !props.hideViewName &&
                    <Typography
                        className={classes.viewName}
                        style={{
                            color: props.chatMessageColorScheme == ChatMessageColorScheme.MINE ?
                                theme.chat.ownMessageTitleColor : theme.chat.companionMessageTitleColor
                        }}
                    >
                        {props.messageData.senderViewName}
                    </Typography>
                }
                <Typography
                    className={classes.messageText}
                    style={{
                        color: props.chatMessageColorScheme == ChatMessageColorScheme.MINE ?
                            theme.chat.ownMessageColor : theme.chat.companionMessageColor
                    }}
                >
                    {props.messageData.content}
                </Typography>
            </Grid>
        </Paper>
    )
}

export const ChatMessage = connect(mapStateToProps)(ChatMessageWrap)