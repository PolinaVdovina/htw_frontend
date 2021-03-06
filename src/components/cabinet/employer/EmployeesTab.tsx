import { useTheme, Grid, Divider, Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";
import React from "react";
import { VacancyEditorDialog } from "../../vacancy-editor/VacancyEditorDialog";
import { Tape } from "../../tape/Tape";
import { RootState, store } from "../../../redux/store";
import { connect, useDispatch } from 'react-redux';
import { removeVacancyFetch, deleteEntity } from "../../../utils/fetchFunctions";
import { startLoadingAction, stopLoadingAction } from "../../../redux/actions/dialog-actions";
import { CabinetContext } from '../cabinet-context';
import AddEntityBlock from "../AddEntityBlock";
import { vacancyToPost } from "../../../utils/tape-converters/vacancy-to-tape-element";
import { TapeFetcherProvider, TapeFetcherContext } from '../../tape/TapeFetcherContext';
import { searchCriteriaFetch } from './../../../utils/fetchFunctions';
import { SortCriteriaDirection, SearchCriteriaOperation, ISearchCriteria } from "../../../utils/search-criteria/types";
import { searchCriteria, sortCriteria } from "../../../utils/search-criteria/builders";
import { pagination } from './../../../utils/search-criteria/builders';
import { useSnackbar } from "notistack";
import { MessageStatus, IMessageInfo } from "../../../utils/fetchInterfaces";
import { RegMiniComponent } from "../RegMiniComponent";

function mapStateToProps(state: RootState) {
    return {
        token: state.authReducer.token,
    }
}

interface IEmployeesTabProps {
    token?: string | null
}

const EmployeesTabComp = (props) => {
    const theme = useTheme();
    const [openRegMiniComp, setOpenRegMiniComp] = React.useState(false);

    const [deletingId, setDeletingId] = React.useState<any>(null);
    const [employes, setEmployes] = React.useState<any>(null);
    const dispatch = useDispatch();
    const cabinetContext = React.useContext(CabinetContext);
    const tapeFetcherContext = React.useContext(TapeFetcherContext);

    const snackbar = useSnackbar();
    const [isTapeOver, setTapeOver] = React.useState(false);
    const getNextEmployees = async () => {
        const paginationSize = 5;
        dispatch(startLoadingAction());
        if (props.token) {
            const fetch = await tapeFetcherContext?.fetchNext(
                (lastPostDate, count) => {
                    const searchCriteriaArray = lastPostDate ? [searchCriteria("viewName", lastPostDate, SearchCriteriaOperation.MORE)] : [];
                    return searchCriteriaFetch("/employee/getBySearchCriteria", props.token, {
                        searchCriteria: [...searchCriteriaArray,searchCriteria("employerLogin", cabinetContext.login, SearchCriteriaOperation.EQUAL),
                        searchCriteria("customers", true, SearchCriteriaOperation.EQUAL),
                        ],
                        sortCriteria: [sortCriteria("viewName", SortCriteriaDirection.ASC)],
                        pagination: pagination(paginationSize)
                    })
                }, "title"
            )
            if (fetch && fetch.result) {
                if (fetch.result.length < paginationSize)
                    setTapeOver(true);
                else
                    setTapeOver(false);
            }
        }
        dispatch(stopLoadingAction());
    }

    const handleClickSave = async () => {

        tapeFetcherContext?.reset();
        await getNextEmployees();

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
        getNextEmployees();
    }, [])

    const onDeleteEmployee = async () => {
        if (props.token) {
            dispatch(startLoadingAction());
            const result: IMessageInfo = await deleteEntity(props.token, deletingId, '/employer/employee');
            if (result.msgStatus == MessageStatus.OK) {
                snackbar.enqueueSnackbar("Сотрудник успешно удален", { variant: "success" });
                tapeFetcherContext?.reset();
                getNextEmployees();
                //tapeFetcherContext && tapeFetcherContext.tapeElements && tapeFetcherContext.setTapeElements(tapeFetcherContext.tapeElements.filter(el => el.id != deletingId));
            }
            else
                snackbar.enqueueSnackbar("Не удалось удалить сотрудника", { variant: "error" });
            setDeletingId(null);
            dispatch(stopLoadingAction());
        }
    }

    return (
        <div>
            {cabinetContext.isMine &&
                <>
                    <Grid container direction="row-reverse" style={{ padding: theme.spacing(2) }}>
                        <Dialog
                            onClose={() => setDeletingId(null)}
                            open={deletingId != null}>
                            <DialogTitle>Вы точно хотите удалить сотрудника?</DialogTitle>
                            <DialogActions>
                                <Button onClick={onDeleteEmployee}>
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
                </>}
            <Tape
                onDeleteClick={cabinetContext.isMine ? (id) => setDeletingId(id) : null}
                elements={
                    tapeFetcherContext?.tapeElements
                }
            />
            <Grid item style={{ flexGrow: 1 }}>
                <Button 
                disabled={isTapeOver}
                variant="contained" 
                color="primary" 
                fullWidth 
                onClick={getNextEmployees} 
                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                >
                    {isTapeOver ? "Лента закончена ": "Дальше"}
                </Button>
            </Grid>
        </div>)
}

export const EmployeesTab = connect(mapStateToProps)(EmployeesTabComp);
