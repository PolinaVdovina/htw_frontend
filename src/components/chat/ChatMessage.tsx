import React from 'react';
import { IChatReceivingMessage } from './../../websockets/chat/interfaces';
import { Paper, makeStyles, createStyles, Theme, Grid, Typography, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTheme } from '@material-ui/core';
import { timeParse } from '../../utils/appliedFunc';
import { IChatSendingMessage } from '../../websockets/chat/interfaces';


export enum ChatMessageColorScheme {
    MINE,
    NOT_MINE
}

interface IChatMessageProps {
    paperStyle?: React.CSSProperties,
    messageData: IChatReceivingMessage & {isFake?: boolean},
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
        },
        paper: {
            padding: theme.spacing(1),
            paddingTop: theme.spacing(0.25),
        },
        viewName: {
            overflowWrap: "anywhere",
            fontSize: "12px",
        },
        bottonGridItem: {
            alignSelf: "flex-end"
        },
        date: {
            textAlign: "right",
            fontSize: "10px",
        },
        loading: {
            color: "white",
            alignSelf: "flex-end",
        },
        messageText: {
            overflowWrap: "anywhere",
            wordBreak: "break-word",
            fontSize: "14px",
        }
    }),
);

const mapStateToProps = (state: RootState) => ({

})

const ChatMessageWrap = (props: IChatMessageProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const date: Date = new Date(Date.parse(props.messageData.createdDate));
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
  
                    {
                        props.messageData.isFake && <CircularProgress size={"15px"} className={classes.loading}/>
                    }
                    {!props.messageData.isFake &&
                        <Typography
                            className={classes.date}
                            style={{
                                color: props.chatMessageColorScheme == ChatMessageColorScheme.MINE ?
                                    theme.chat.ownMessageTitleColor : theme.chat.companionMessageTitleColor
                            }}
                        >
                            {timeParse(props.messageData.createdDate)}
                        </Typography>
                    }
         
            </Grid>
        </Paper>
    )
}

export const ChatMessage = connect(mapStateToProps)(ChatMessageWrap)