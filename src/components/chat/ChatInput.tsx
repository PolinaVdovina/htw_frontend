import { IChatReceivingMessage } from './../../websockets/chat/interfaces';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { makeStyles, Theme, createStyles, Paper, Grid, Typography, Avatar, TextField, Tooltip, IconButton } from '@material-ui/core';
import React from 'react';
import { ChatMessage } from './ChatMessage';
import { useTheme } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { isWhitespace } from '../../utils/validateFunctions';


interface IChatInputProps {
    messagesData?: Array<IChatReceivingMessage> | null,
    myLogin?: string | null,
    onSendButtonClick?: (msg: string) => any
}


const mapStateToProps = (state: RootState) => ({
    myLogin: state.authReducer.login
})

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootGrid: {
            backgroundColor: "white",
            flexWrap: "nowrap",
            alignItems: "center"
        },
        textField: {
            flexGrow: 1,
            borderRadius: 0,
            backgroundColor: "white",
            paddingLeft: theme.spacing(2)
        }
    }),
);

const ChatInputWrap = (props: IChatInputProps) => {
    const classes = useStyles();
    const [inputMessage, setInputMessage] = React.useState("");

    const sendButtonHandler = () => {
        if (!isWhitespace(inputMessage)) {
            props.onSendButtonClick && props.onSendButtonClick(inputMessage);
            setInputMessage("");
        }
    }


    return (
        <Grid
            item container
            direction="row"
            className={classes.rootGrid}
        >
            <TextField
                className={classes.textField}
                onChange={(event) => setInputMessage(event.target.value)}
                value={inputMessage}
                onKeyDown={
                    (event) => event.key === 'Enter' && sendButtonHandler()
                }
                autoFocus={true}
                size="small"
                InputProps={{ disableUnderline: true }}
            />
            <Tooltip
                color="primary"
                title="Отправить сообщение"
            >
                <IconButton onClick={sendButtonHandler}>
                    <SendIcon />
                </IconButton>
            </Tooltip>
        </Grid>
    )
}

export const ChatInput = connect(mapStateToProps)(ChatInputWrap)