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
import { searchCriteria, pagination } from '../../utils/search-criteria/builders';
import { SearchCriteriaOperation } from '../../utils/search-criteria/types';
import { HCenterizingGrid } from '../grid-containers/HCenterizingGrid';

function mapStateToProps(state: RootState) {
    return {
        token: state.authReducer.token,
        login: state.authReducer.login
    }
}

interface IChatListTabComp {
    token?: string | null
}

const ChatListTabComp = (props) => {
    const theme = useTheme();
    const [openRegMiniComp, setOpenRegMiniComp] = React.useState(false);

    const [deletingId, setDeletingId] = React.useState<any>(null);
    const [employes, setEmployes] = React.useState<any>(null);
    const dispatch = useDispatch();
    const tapeFetcherContext = React.useContext(TapeFetcherContext);

    const snackbar = useSnackbar();

    const getNextChats = async () => {
        dispatch(startLoadingAction());
        if (props.token) {
            await tapeFetcherContext?.fetchNext(
                (lastPostDate, count) => {
                    
                    return searchCriteriaFetch("/chat/getChatList/" + props.login, props.token, {
                        searchCriteria: [
                            searchCriteria("login", props.login, SearchCriteriaOperation.IN),                        
                        ],
                        //sortCriteria: [sortCriteria("name", SortCriteriaDirection.ASC)],
                        pagination: pagination(5)
                    })
                }, "title"
            )
        }
        dispatch(stopLoadingAction());
    }

    const handleClickSave = async () => {

        tapeFetcherContext?.reset();
        await getNextChats();

    }

    const handleClickClose = () => {
        setOpenRegMiniComp(false);
    }

    const handleClickOpen = () => {
        setOpenRegMiniComp(true);
    }

    React.useEffect(() => {
        if (props.token) {

        }
    }, [])

    React.useEffect(() => {
        getNextChats();
    }, [])

    const onDeleteChat = async () => {
        if (props.token) {
            dispatch(startLoadingAction());
            const result: IMessageInfo = await changePersonalDataFetch(props.token, {}, '/chat/deleteChat/' + deletingId);
            if (result.msgStatus == MessageStatus.OK) {
                snackbar.enqueueSnackbar("Чат успешно удален", { variant: "success" });
                tapeFetcherContext?.reset();
                getNextChats();
                
            }
            else
                snackbar.enqueueSnackbar("Не удалось удалить чат", { variant: "error" });*/
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
            <AddEntityBlock handleClickOpen={() => alert("в разработке")/*setOpenRegMiniComp(true)*/} />
        </Grid>
        {openRegMiniComp &&
            <RegMiniComponent handleClickClose={handleClickClose} handleClickSave={handleClickSave} />
        }
        <Divider />
            
        <Tape
            onDeleteClick={(id) => setDeletingId(id)}
            elements={
                tapeFetcherContext?.tapeElements
            }
        />
        <Grid item style={{ flexGrow: 1 }}>
            <Button variant="contained" color="primary" fullWidth onClick={getNextChats} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>Дальше</Button>
        </Grid>
    </>)
}

export const ChatListTab = connect(mapStateToProps)(ChatListTabComp);
