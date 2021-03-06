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
import { searchCriteriaFetch } from '../../../utils/fetchFunctions';
import { SortCriteriaDirection, SearchCriteriaOperation } from "../../../utils/search-criteria/types";
import { searchCriteria, sortCriteria } from "../../../utils/search-criteria/builders";
import { pagination } from '../../../utils/search-criteria/builders';
import { useSnackbar } from "notistack";
import { MessageStatus, IMessageInfo } from "../../../utils/fetchInterfaces";
import { RegMiniComponent } from "../RegMiniComponent";


function mapStateToProps(state: RootState) {
    return {
        token: state.authReducer.token,
    }
}

interface IStudentsTabProps {
    token?: string | null
}

const StudentsTabComp = (props) => {
    const theme = useTheme();
    const [openRegMiniComp, setOpenRegMiniComp] = React.useState(false);
    const dispatch = useDispatch();
    const cabinetContext = React.useContext(CabinetContext);
    const tapeFetcherContext = React.useContext(TapeFetcherContext);

    const snackbar = useSnackbar();

    const getNextEmployees = async () => {
        dispatch(startLoadingAction());
        if (props.token) {
            await tapeFetcherContext?.fetchNext(
                (lastPostDate, count) => {
                    const searchCriteriaArray = lastPostDate ? [searchCriteria("viewName", lastPostDate, SearchCriteriaOperation.MORE)] : [];
                    return searchCriteriaFetch("/personal/getBySearchCriteria", props.token, {
                        searchCriteria: [...searchCriteriaArray,searchCriteria("institutionLogin", cabinetContext.login, SearchCriteriaOperation.EQUAL),
                        searchCriteria("customers", true, SearchCriteriaOperation.EQUAL),
                        ],
                        sortCriteria: [sortCriteria("viewName", SortCriteriaDirection.ASC)],
                        pagination: pagination(5)
                    })
                }, "title"
            )
        }
        dispatch(stopLoadingAction());
    }

    const handleClickSave = async() => {
        
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

    return (
        <div>
            {cabinetContext.isMine &&
                <>
                    <Grid container direction="row-reverse" style={{ padding: theme.spacing(2) }}>
                        <AddEntityBlock handleClickOpen={() => setOpenRegMiniComp(true)} />
                    </Grid>
                    {openRegMiniComp &&
                        <RegMiniComponent handleClickClose={handleClickClose} handleClickSave={handleClickSave} role="student"/>
                    }
                    <Divider />
                </>}
            <Tape
                elements={
                    tapeFetcherContext?.tapeElements
                }
            />
        </div>)
}

export const StudentsTab = connect(mapStateToProps)(StudentsTabComp);