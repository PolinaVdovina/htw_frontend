import { useTheme, Grid, Divider, Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";
import React from "react";
import { VacancyEditorDialog } from "../../vacancy-editor/VacancyEditorDialog";
import { Tape } from "../../tape/Tape";
import { RootState } from "../../../redux/store";
import { connect, useDispatch } from 'react-redux';
import { removeVacancyFetch } from "../../../utils/fetchFunctions";
import { startLoadingAction, stopLoadingAction } from "../../../redux/actions/dialog-actions";
import { CabinetContext } from '../cabinet-context';
import AddEntityBlock from "../AddEntityBlock";
import { vacancyToPost } from "../../../utils/tape-converters/vacancy-to-tape-element";
import { TapeFetcherProvider, TapeFetcherContext } from '../../tape/TapeFetcherContext';
import { searchCriteriaFetch } from './../../../utils/fetchFunctions';
import { SortCriteriaDirection, SearchCriteriaOperation } from "../../../utils/search-criteria/types";
import { searchCriteria, sortCriteria } from "../../../utils/search-criteria/builders";
import { pagination } from './../../../utils/search-criteria/builders';
import { useSnackbar } from "notistack";
import { MessageStatus } from "../../../utils/fetchInterfaces";

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
    const [openVacancyDialog, setOpenVacancyDialog] = React.useState(false);

    const [deletingId, setDeletingId] = React.useState<any>(null);
    const [employes, setEmployes] = React.useState<any>(null);
    const dispatch = useDispatch();
    const cabinetContext = React.useContext(CabinetContext);
    const tapeFetcherContext = React.useContext(TapeFetcherContext);

    const snackbar = useSnackbar();

    const getNextEmployees = async () => {
        if (props.token) {
            await tapeFetcherContext?.fetchNext(
                (lastPostDate, count) => searchCriteriaFetch("/employee/getBySearchCriteria", props.token, {
                    searchCriteria: [searchCriteria("employerLogin", cabinetContext.login, SearchCriteriaOperation.EQUAL)]
                }
                )
            )
        }
    }

    React.useEffect(() => {

        getNextEmployees();
    }, [])

    const onDeleteEmployee = async () => {
        if (props.token) {
            dispatch(startLoadingAction());
            const result = await deleteEmployee(props.token, deletingId);
            if (result == MessageStatus.OK) {
                snackbar.enqueueSnackbar("Сотрудник успешно удален", { variant: "success" });
                tapeFetcherContext && tapeFetcherContext.tapeElements && tapeFetcherContext.setTapeElements(tapeFetcherContext.tapeElements.filter(el => el.id != deletingId));
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
                        <AddEntityBlock handleClickOpen={() => setOpenVacancyDialog(true)} />
                    </Grid>
                    <Divider />
                </>}
            <Tape
                onDeleteClick={cabinetContext.isMine ? (id) => setDeletingId(id) : null}
                elements={
                    tapeFetcherContext?.tapeElements
                }
            />
            <Grid item style={{ flexGrow: 1 }}>
                <Button variant="contained" color="primary" fullWidth onClick={getNextEmployees} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>Дальше</Button>
            </Grid>
        </div>)
}

export const EmployeesTab = connect(mapStateToProps)(EmployeesTabComp);
