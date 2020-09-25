import { useTheme, Grid, Dialog, DialogTitle, DialogActions, Button, Divider } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React from 'react'
import { connect, useDispatch } from 'react-redux';
import AddEntityBlock from '../../components/cabinet/AddEntityBlock';
import { RegMiniComponent } from '../../components/cabinet/RegMiniComponent';
import { Tape } from '../../components/tape/Tape';
import { TapeFetcherContext } from '../../components/tape/TapeFetcherContext';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';
import { RootState } from '../../redux/store';
import { deleteEntity } from '../../utils/fetchFunctions';
import { IMessageInfo, MessageStatus } from '../../utils/fetchInterfaces';

function mapStateToProps(state: RootState) {
    return {
        token: state.authReducer.token,
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
                    /*const searchCriteriaArray = lastPostDate ? [searchCriteria("viewName", lastPostDate, SearchCriteriaOperation.MORE)] : [];
                    return searchCriteriaFetch("/employee/getBySearchCriteria", props.token, {
                        searchCriteria: [...searchCriteriaArray,searchCriteria("employerLogin", cabinetContext.login, SearchCriteriaOperation.EQUAL),
                        searchCriteria("customers", true, SearchCriteriaOperation.EQUAL),
                        ],
                        sortCriteria: [sortCriteria("viewName", SortCriteriaDirection.ASC)],
                        pagination: pagination(5)
                    })*/
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
            //const result: IMessageInfo = await deleteEntity(props.token, deletingId, '/employer/employee');
            if (result.msgStatus == MessageStatus.OK) {
                snackbar.enqueueSnackbar("Чат успешно удален", { variant: "success" });
                tapeFetcherContext?.reset();
                getNextChats();
                //tapeFetcherContext && tapeFetcherContext.tapeElements && tapeFetcherContext.setTapeElements(tapeFetcherContext.tapeElements.filter(el => el.id != deletingId));
            }
            else
                snackbar.enqueueSnackbar("Не удалось удалить чат", { variant: "error" });
            setDeletingId(null);
            dispatch(stopLoadingAction());
        }
    }

    return (
        <div>
            <Grid container direction="row-reverse" style={{ padding: theme.spacing(2) }}>
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
                <AddEntityBlock handleClickOpen={() => setOpenRegMiniComp(true)} />
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
        </div>)
}

export const ChatListTab = connect(mapStateToProps)(ChatListTabComp);