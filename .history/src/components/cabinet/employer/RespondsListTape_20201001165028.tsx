import React from 'react'
import { CabinetContext } from '../cabinet-context';
import { TapeFetcherContext } from '../../tape/TapeFetcherContext';
import { useTheme, Grid, Button } from '@material-ui/core';
import { useDispatch, connect } from 'react-redux';
import { startLoadingAction, stopLoadingAction } from '../../../redux/actions/dialog-actions';
import { searchCriteria, sortCriteria, pagination } from '../../../utils/search-criteria/builders';
import { SearchCriteriaOperation, SortCriteriaDirection } from '../../../utils/search-criteria/types';
import { searchCriteriaFetch } from '../../../utils/fetchFunctions';
import { Tape } from '../../tape/Tape';
import { RootState } from '../../../redux/store';


interface ISubscriptionPaperProps {
    token?: string | null,
}

function RespondListTapeComp(props) {
    const cabinetContext = React.useContext(CabinetContext);
    const tapeFetcherContext = React.useContext(TapeFetcherContext);
    const theme = useTheme();
    const dispatch = useDispatch();

    const getSubscriptions = async () => {
        dispatch(startLoadingAction());

        if (props.token) {
            await tapeFetcherContext?.fetchNext(
                (lastPostDate, count) => {
                    const searchCriteriaArray = lastPostDate ? [searchCriteria("createdDate", lastPostDate, SearchCriteriaOperation.MORE)] : [];
                    return searchCriteriaFetch("/personal/getBySearchCriteria", props.token, {
                        searchCriteria: [searchCriteria("respondVacancy", props.idVacancy, SearchCriteriaOperation.EQUAL),
                                         searchCriteria("customers", true, SearchCriteriaOperation.EQUAL), ...searchCriteriaArray],
                        sortCriteria: [sortCriteria("viewName", SortCriteriaDirection.ASC)],
                        pagination: pagination(5)

                    })
                }, "title"
            )
        }
        dispatch(stopLoadingAction());
    }

    React.useEffect(() => {
        //if((props.subscriptionLogins != null) && (props.subscriptionLogins.length > 0)  )
        getSubscriptions();
    }, [props.token])

    return (
        <Grid direction="column"
            container
            justify='center'
            alignContent={"center"}>

            <Tape elements={tapeFetcherContext?.tapeElements} />
            <Button
                onClick={getSubscriptions}
                variant="contained"
                color="primary"
                style={{ borderRadius: 0 }}
            >
                Дальше
                </Button>
        </Grid>
    )
}


export const RespondListTape = connect(
    (state: RootState) => ({
        token: state.authReducer.token,

    })
)(RespondListTapeComp)