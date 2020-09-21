import { IChatReceivingMessage } from './../../websockets/chat/interfaces';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { makeStyles, Theme, createStyles, Paper, Grid, Typography, Avatar, CircularProgress } from '@material-ui/core';
import React from 'react';
import { ChatMessage, ChatMessageColorScheme } from './ChatMessage';
import { useTheme } from '@material-ui/core';
import { getAvatarUrl } from './../../utils/fetchFunctions';
import InfiniteScroll from 'react-infinite-scroller';
import { dateParse } from './../../utils/appliedFunc';


interface IChatBodyProps {
    messagesData?: Array<IChatReceivingMessage> | null,
    myLogin?: string | null,
    avatarUID?: any,
    fetchNext: (page: number) => void,
    dataFetching?: boolean,
    isTapeOver?: boolean,
    getMessagesCount: number,
}


const mapStateToProps = (state: RootState) => ({
    myLogin: state.authReducer.login,
    avatarUID: state.userPersonalsReducer.avatarUrlUid
})

export const useComponentWillMount = (func) => {
    const willMount = React.useRef(true)

    if (willMount.current) func()

    willMount.current = false
}

const avatarSize = "32px"
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootDiv: {
            flexGrow: 1,
            padding: theme.spacing(1),
            overflowY: "scroll",
            overflowAnchor: "revert",
            flexWrap: "nowrap",
            flexBasis: 0,
            //scrollBehavior: "smooth",
            backgroundColor: theme.chat.chatPaperBackgroundColor
        },
        messageGrid: {
            width: "max-content",
            minWidth: "150px",
            maxWidth: "70%",
            alignItems: "flex-end",
            flexWrap: "nowrap",
            //width: "calc(100% - " + theme.spacing(1) + "px - 32px )"
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
    const bottomElementRef = React.useRef<any>();
    const bodyRef = React.useRef<any>();;
    let [canScroll, setCanScroll] = React.useState(true);

    //Автоскролл вниз при новых сообщениях
    React.useEffect(() => {
        if (bodyRef.current && bottomElementRef.current) {
            //Если я близок к концу ленты
            if (bodyRef.current.scrollHeight - bodyRef.current.clientHeight - bodyRef.current.scrollTop < 150)
                bottomElementRef.current.scrollIntoView({ behavior: 'smooth' });
            //Скролю в самый низ
        }
    }, [props.getMessagesCount])

    //Автоскролл вниз при открытии клавиатуры на телефоне (чтобы клавиатура не закрывала сообщение последнее)
    React.useEffect(
        () => {
            const body = bodyRef.current;
            const currentHeight = body.clientHeight
            const resizeHandler = (event) => {
                if (body) {
                    const newHeight = body.clientHeight;
                    const keyboardSize = currentHeight - newHeight; //Вычисляю, насколько клавиатура уменьшила экран
                    //Если я близок к концу ленты
                    if (body.scrollHeight - body.clientHeight - body.scrollTop < keyboardSize + 100)
                        body.scrollTop = body.scrollHeight; //Скролю в самый низ
                }
            }

            window.addEventListener("resize", resizeHandler);
            return () => body.removeEventListener("resize", resizeHandler);
        }
    )


    return (
        <div ref={bodyRef} className={classes.rootDiv}>
            <InfiniteScroll
                style={{
                    flexDirection: "column",
                    display: "flex",
                }}
                threshold={500}
                pageStart={0}
                useWindow={false}
                isReverse
                hasMore={!props.isTapeOver}
                loader={<CircularProgress style={{ alignSelf: "center" }} />}
                loadMore={props.fetchNext}
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

                        const currentMessageDate = new Date(Date.parse(messageData.createdDate));
                        const prevMessageDate = prevMsg ? new Date(Date.parse(prevMsg.createdDate)) : null;

                        if (isLastUserMessage) {
                            if (isMine)
                                roundedStyles.borderBottomLeftRadius = theme.spacing(2);
                            else
                                roundedStyles.borderBottomRightRadius = theme.spacing(2);
                        }
                        return (
                            <Grid container direction="column" key={messageData.id} >
                                {
                                    (!prevMessageDate ||
                                        (currentMessageDate.getFullYear() != prevMessageDate.getFullYear() || currentMessageDate.getMonth() != prevMessageDate.getMonth() || currentMessageDate.getDate() != prevMessageDate.getDate())) &&
                                    
                                    <Paper style={{ alignSelf: "center", padding: theme.spacing(1) }}>
                                        {dateParse(messageData.createdDate)}
                                    </Paper>
                                }
                                <Grid
                                    key={messageData.id}
                                    item
                                    container
                                    style={{
                                        marginBottom: isLastUserMessage ? theme.spacing(2) : theme.spacing(1),
                                        alignSelf: isMine ? "flex-end" : "flex-start"
                                    }}
                                    className={classes.messageGrid}
                                    direction={isMine ? "row-reverse" : "row"}
                                >
                                    {
                                        !isMine &&
                                        <Grid item>
                                            <Avatar
                                                src={getAvatarUrl(messageData.sender) + "?" + props.avatarUID}
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
                            </Grid>
                        )
                    })
                }
                {/* Без этой херни внизу не будет отступа и последнее сообщение прилепает к низу, мдя */}
                <Grid ref={bottomElementRef} container item >
                    <Grid item style={{ height: 1 }}></Grid>
                </Grid>
            </InfiniteScroll>
        </div>
    )
}

export const ChatBody = connect(mapStateToProps)(ChatBodyWrap)