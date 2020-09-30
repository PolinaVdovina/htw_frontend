import React from 'react'
import { IconButton, Grid, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { Tooltip, Divider, Button, Dialog } from '@material-ui/core';
import { Tape } from '../tape/Tape';
import { CabinetContext } from './cabinet-context';
import { TapeFetcherContext } from '../tape/TapeFetcherContext';
import { useTheme } from '@material-ui/core';
import { useDispatch, connect } from 'react-redux';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';
import { RootState } from '../../redux/store';
import { searchCriteriaFetch } from '../../utils/fetchFunctions';
import { searchCriteria, sortCriteria, pagination } from '../../utils/search-criteria/builders';
import { SearchCriteriaOperation, SortCriteriaDirection } from '../../utils/search-criteria/types';

interface ISubscriptionPaperProps {
    token?: any,
    subscriptionCount?: number | null,
    observerCount?: number | null,
    subscription: boolean,
}

function SubscriptionBlockComp(props: ISubscriptionPaperProps) {
    const cabinetContext = React.useContext(CabinetContext);
    const tapeFetcherContext = React.useContext(TapeFetcherContext);
    const theme = useTheme();
    const dispatch = useDispatch();

    const getSubscriptions = async () => {
        dispatch(startLoadingAction());

        const criteriaFieldName = props.subscription ? "observerLogin" : "subscriptionLogin";
        if (props.token) {
            await tapeFetcherContext?.fetchNext(
                (lastPostDate, count) => {
                    const searchCriteriaArray = lastPostDate ? [searchCriteria("viewName", lastPostDate, SearchCriteriaOperation.MORE)] : [];
                    return searchCriteriaFetch("/account/getBySearchCriteria", props.token, {
                        searchCriteria: [searchCriteria(criteriaFieldName, cabinetContext.login, SearchCriteriaOperation.EQUAL),
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


export const SubscriptionBlock = connect(
    (state: RootState) => ({
        token: state.authReducer.token,

    })
)(SubscriptionBlockComp)