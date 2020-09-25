import { useTheme, Grid, Dialog, DialogTitle, DialogActions, Button, Divider, Paper, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React from 'react'
import { connect, useDispatch } from 'react-redux';
import AddEntityBlock from '../../components/cabinet/AddEntityBlock';
import { RegMiniComponent } from '../../components/cabinet/RegMiniComponent';
import { Tape } from '../../components/tape/Tape';
import { TapeFetcherContext } from '../../components/tape/TapeFetcherContext';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';
import { RootState } from '../../redux/store';
import { changePersonalDataFetch, deleteEntity, searchCriteriaFetch } from '../../utils/fetchFunctions';
import { IMessageInfo, MessageStatus } from '../../utils/fetchInterfaces';
import { searchCriteria, pagination, sortCriteria } from '../../utils/search-criteria/builders';
import { SearchCriteriaOperation, SortCriteriaDirection } from '../../utils/search-criteria/types';
import { HCenterizingGrid } from '../grid-containers/HCenterizingGrid';
import { usePrivateChatTracking as useChatTracking } from './../../websockets/chat/hooks';
import { IChatReceivingMessage, IReceivingChatData } from './../../websockets/chat/interfaces';
import { chatToPostList } from './../../utils/tape-converters/chat-to-tape-element';
import { removeChatAction } from '../../redux/actions/chat-actions';
import { showChat } from './../../redux/reducers/chat-reducers';

function mapStateToProps(state: RootState) {
    return {
        token: state.authReducer.token,
        login: state.authReducer.login,
        chats: state.chatReducer.chats
    }
}

interface IChatListTabComp {
    token?: string | null,
    chats?: Array<IReceivingChatData> | null
}

const ChatListTabComp = (props: IChatListTabComp) => {
    const theme = useTheme();
    const [openRegMiniComp, setOpenRegMiniComp] = React.useState(false);

    const [deletingId, setDeletingId] = React.useState<any>(null);
    const [employes, setEmployes] = React.useState<any>(null);
    const dispatch = useDispatch();
    const tapeFetcherContext = React.useContext(TapeFetcherContext);

    const [messagesData, setMessagesData] = React.useState<IChatReceivingMessage>();


    const snackbar = useSnackbar();

/*     const getNextChats = async () => {
        dispatch(startLoadingAction());
        if (props.token) {
            await tapeFetcherContext?.fetchNext(
                (lastPostDate, count) => {
                    
                    return searchCriteriaFetch("/chat/getChatList/" + props.login, props.token, {
                        searchCriteria: [
                            searchCriteria("view", true, SearchCriteriaOperation.EQUAL),                     
                        ],
                        sortCriteria:[sortCriteria("lastMessageInChatDate", SortCriteriaDirection.DESC) ],
                        //sortCriteria: [sortCriteria("name", SortCriteriaDirection.ASC)],

                    })
                }, "title"
            )
        }
        dispatch(stopLoadingAction());
    } */

    const handleClickSave = async () => {

        tapeFetcherContext?.reset();
        //await getNextChats();

    }

    const handleClickClose = () => {
        setOpenRegMiniComp(false);
    }

    const handleClickOpen = (chatId: number, viewName: string, chatName: string) => {
        dispatch(showChat(chatName, viewName, chatId))
       // setOpenRegMiniComp(true);
    }

    React.useEffect(() => {
        if (props.token) {

        }
    }, [])

    React.useEffect(() => {
        //getNextChats();
    }, [])

    const onDeleteChat = async () => {
        if (props.token) {
            dispatch(startLoadingAction());
            const result: IMessageInfo = await changePersonalDataFetch(props.token, {}, '/chat/deleteChat/' + deletingId);
            if (result.msgStatus == MessageStatus.OK) {
                snackbar.enqueueSnackbar("Чат успешно удален", { variant: "success" });
                tapeFetcherContext?.reset();
                dispatch(removeChatAction(deletingId));
                //getNextChats();
                
            }
            else
                snackbar.enqueueSnackbar("Не удалось удалить чат", { variant: "error" });
            
            setDeletingId(null);
            dispatch(stopLoadingAction());
        }
    }

    return (<>
        <Grid container /*direction="row-reverse"*/ style={{ padding: theme.spacing(2) }}>
            <Typography variant='h4'>Чаты</Typography>
            <Dialog
                onClose={() => setDeletingId(null)}
                open={deletingId != null}>
                <DialogTitle>Вы хотите удалить чат?</DialogTitle>
                <DialogActions>
                    <Button onClick={onDeleteChat}>
                        Да
                    </Button>
                    <Button onClick={() => setDeletingId(null)}>
                        Нет
                    </Button>
                </DialogActions>
            </Dialog>
            {/*<AddEntityBlock handleClickOpen={() => setOpenRegMiniComp(true)} />*/}
        </Grid>
        {openRegMiniComp &&
            <RegMiniComponent handleClickClose={handleClickClose} handleClickSave={handleClickSave} />
        }
        <Divider />
        
        <Tape
            onDeleteClick={(id) => setDeletingId(id)}
            elements={ chatToPostList(props.chats, handleClickOpen )}
        />

    </>)
}

export const ChatListTab = connect(mapStateToProps)(ChatListTabComp);
