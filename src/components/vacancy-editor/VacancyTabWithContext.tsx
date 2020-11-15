import React from 'react';
import { useDispatch, connect } from 'react-redux';

import { TapeFetcherProvider, TapeFetcherContext } from '../tape/TapeFetcherContext';
import { vacancyToPost } from '../../utils/tape-converters/vacancy-to-tape-element';
import AddEntityBlock from '../cabinet/AddEntityBlock';
import { VacancyList } from '../cabinet/employer/VacancyList';
import { VacancyEditorDialog } from './VacancyEditorDialog';
import { Grid, Divider, useTheme, Dialog, Button, DialogTitle, DialogActions } from '@material-ui/core';
import { CabinetContext } from '../cabinet/cabinet-context';
import { searchCriteria, sortCriteria } from '../../utils/search-criteria/builders';
import { removeVacancyFetch } from '../../utils/fetchFunctions';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';
import { MessageStatus } from '../../utils/fetchInterfaces';
import { useSnackbar } from 'notistack';
import { SearchCriteriaOperation, SortCriteriaDirection } from '../../utils/search-criteria/types';
import { pagination } from '../../utils/search-criteria/builders';
import { searchCriteriaFetch } from '../../utils/fetchFunctions';
import { RootState } from '../../redux/store';
import { IVacancy } from './../../utils/tape-converters/vacancy-to-tape-element';
import { v4 as uuidv4 } from 'uuid';
import { addressGlue } from './../../utils/appliedFunc';

function mapStateToProps(state: RootState) {
    return {
        token: state.authReducer.token,
    }
}

const VacancyTabComp = (props) => {
    //const [openVacancyDialog, setOpenVacancyDialog] = React.useState(false);
    const [deletingId, setDeletingId] = React.useState<any>(null);
    const dispatch = useDispatch();
    const cabinetContext = React.useContext(CabinetContext);
    const tapeFetcherContext = React.useContext(TapeFetcherContext);
    const theme = useTheme();
    const snackbar = useSnackbar();
    const [isTapeOver, setTapeOver] = React.useState(false);
    const onDeleteVacancy = async () => {
        dispatch(startLoadingAction());
        const result = await removeVacancyFetch(props.token, deletingId);
        if (result == MessageStatus.OK) {
            snackbar.enqueueSnackbar("Вакансия успешно удалена", { variant: "success" });
            tapeFetcherContext?.reset();
            await getNextVacancies();
            //tapeFetcherContext?.deleteTapeElement(deletingId);
        }
        else
            snackbar.enqueueSnackbar("Не удалось удалить вакансию", { variant: "error" });

        setDeletingId(null);

        dispatch(stopLoadingAction());
    }

    const getNextVacancies = async () => {
        const paginationSize = 5;
        const mineCriteria = (cabinetContext.role == "ROLE_EMPLOYER") ?
            searchCriteria("employerLogin", cabinetContext.login, SearchCriteriaOperation.EQUAL)
            :
            searchCriteria("employeeLogin", cabinetContext.login, SearchCriteriaOperation.EQUAL)

        const fetch = await tapeFetcherContext?.fetchNext(
            (lastPostDate, dataCount) => searchCriteriaFetch("/vacancy/getBySearchCriteria", props.token,
                {
                    searchCriteria: [
                        searchCriteria("createdDate", lastPostDate, SearchCriteriaOperation.LESS),
                        searchCriteria("active", true, SearchCriteriaOperation.EQUAL),
                        mineCriteria
                    ],
                    sortCriteria: [sortCriteria("createdDate", SortCriteriaDirection.DESC)],
                    pagination: pagination(paginationSize)
                }));
        if (fetch && fetch.result) {
            if (fetch.result.length < paginationSize)
                setTapeOver(true);
            else
                setTapeOver(false);
        }
    }


    React.useEffect(() => {
        getNextVacancies();
    }, [])


    return (
        <>
            {cabinetContext.isMine &&
                <Dialog
                    onClose={() => setDeletingId(null)}
                    open={deletingId != null}>
                    <DialogTitle>Вы точно хотите удалить вакансию?</DialogTitle>
                    <DialogActions>
                        <Button onClick={onDeleteVacancy}>
                            Да
                        </Button>
                        <Button onClick={() => setDeletingId(null)}>
                            Нет
                        </Button>
                    </DialogActions>
                </Dialog>
            }
            <Grid container direction="row-reverse" style={{ padding: theme.spacing(2) }}>
                <AddEntityBlock handleClickOpen={() => { props.resetDefaultValues(); props.setOpenVacancyDialog(true) }} />
            </Grid>
            <Divider />
            <VacancyList
                isTapeOver={isTapeOver}
                getNextVacancies={getNextVacancies}
                onDeleteClick={cabinetContext.isMine ? (id) => setDeletingId(id) : null}
            />
            <VacancyEditorDialog
                defaultValues={props.defaultValues}
                onClose={() => props.setOpenVacancyDialog(false)}
                onSubmitSuccess={async (vacancy) => {
                    await dispatch(startLoadingAction());
                    tapeFetcherContext?.addTapeElementAtFirst(vacancy);
                    tapeFetcherContext?.reset();
                    await getNextVacancies();
                    await dispatch(stopLoadingAction());
                    props.setOpenVacancyDialog(false);
                }}
                open={props.openVacancyDialog} />
        </>
    )
}

const VacancyTab = connect(mapStateToProps)(VacancyTabComp);

export const VacancyTabWithContext = () => {
    const [openVacancyDialog, setOpenVacancyDialog] = React.useState(false);
    const [defaultValues, setDefaultValues] = React.useState<any>(null);


    const dispatch = useDispatch();
    const theme = useTheme();
    const resetDefaultValues = () => { setDefaultValues(null) }
    const changeHandler = (vacancy: IVacancy) => {
        const processedVacancy = {
            ...vacancy,
            demands: vacancy.demands && vacancy.demands.map((demandsString: string) => ({ value: demandsString, id: uuidv4() })),
            duties: vacancy.duties && vacancy.duties.map((dutyString: string) => ({ value: dutyString, id: uuidv4() })),
            address: vacancy ? {
                value: addressGlue(vacancy.address)
            } : null,
        }

        setDefaultValues(processedVacancy);
        setOpenVacancyDialog(true);
    }

    return (
        <TapeFetcherProvider
            key={2}
            dataConverterFunction={
                (data) => vacancyToPost(data, { changeFunction: changeHandler })
            }
        >
            <VacancyTab
                resetDefaultValues={resetDefaultValues}
                defaultValues={defaultValues}
                openVacancyDialog={openVacancyDialog}
                setOpenVacancyDialog={setOpenVacancyDialog}
            />
        </TapeFetcherProvider >
    )
}


