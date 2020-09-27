import { IChatReceivingMessage } from './../../websockets/chat/interfaces';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { makeStyles, Theme, createStyles, Paper, Grid, Typography, Avatar, TextField, Tooltip, IconButton, Grow, Collapse } from '@material-ui/core';
import React from 'react';
import { ChatMessage } from './ChatMessage';
import { useTheme } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { isWhitespace } from '../../utils/validateFunctions';
import { sendWritingStatusMessage } from '../../websockets/chat/actions';
import { Picker as SmilePicker, EmojiData } from 'emoji-mart'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import 'emoji-mart/css/emoji-mart.css'
import Picker, { IEmojiData } from 'emoji-picker-react';
import "./emoji.css"
import KeyboardIcon from '@material-ui/icons/Keyboard';
import useDeviceDetect from './../../utils/common-hooks';

interface IChatInputProps {
    messagesData?: Array<IChatReceivingMessage> | null,
    myLogin?: string | null,
    onSendButtonClick?: (msg: string) => any,
    onFocus?: (event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
    chatName?: string | null,
}


const mapStateToProps = (state: RootState) => ({
    myLogin: state.authReducer.login,
    chatName: state.chatReducer.chatName,
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
    const textFieldRef = React.useRef<any>();
    const theme = useTheme();
    const [showSmiles, setShowSmiles] = React.useState(false);
    const isMobile = useDeviceDetect();

    const sendButtonHandler = (event) => {
        event.preventDefault();
        if (!isWhitespace(inputMessage)) {
            props.onSendButtonClick && props.onSendButtonClick(inputMessage);
            setInputMessage("");
        }
        textFieldRef.current.focus();
    }

    const changeInputMessageHandler = (event) => {
        if (props.chatName) {
            if (event.target.value != "")
                sendWritingStatusMessage(props.chatName, true);
            else
                sendWritingStatusMessage(props.chatName, false);
        }
        setInputMessage(event.target.value);
    }

    const smileMenuOpenClickHandler = () => {
        setShowSmiles(currentValue => !currentValue);
        textFieldRef.current.focus();
    }

    const smileClickHandler = (event: MouseEvent, data: IEmojiData) => {
        textFieldRef.current.focus();
        setInputMessage(oldMsg => oldMsg + data.emoji);
        //alert(data.emoji);
    }


    return (
        <Grid
            item container
            direction="column"
        >
            <Grid
                item container
                direction="row"
                className={classes.rootGrid}
            >
                {
                    !isMobile &&
                    <Tooltip
                        color="primary"
                        title={showSmiles ? "Клавиатура" : "Эмоции"}
                    >
                        <IconButton onClick={smileMenuOpenClickHandler}>
                            {
                                showSmiles ? <KeyboardIcon /> : <EmojiEmotionsIcon />
                            }
                        </IconButton>
                    </Tooltip>
                }
                <TextField
                    inputRef={textFieldRef}
                    onFocus={props.onFocus}
                    className={classes.textField}
                    onChange={changeInputMessageHandler}
                    value={inputMessage}
                    onKeyDown={
                        (event) => event.key === 'Enter' && sendButtonHandler(event)
                    }
                    autoFocus={true}
                    size="small"
                    InputProps={{
                        disableUnderline: true,

                    }}
                />

                <Grow in={!isWhitespace(inputMessage)}>
                    <Tooltip
                        color="primary"
                        title="Отправить сообщение"
                    >
                        <IconButton onClick={sendButtonHandler}>
                            <SendIcon />
                        </IconButton>
                    </Tooltip>
                </Grow>
            </Grid>
            <Collapse in={showSmiles}>
                {showSmiles &&
                    <Picker key={1} disableSearchBar onEmojiClick={smileClickHandler} />
                }
            </Collapse>
        </Grid>
    )
}

export const ChatInput = connect(mapStateToProps)(ChatInputWrap)