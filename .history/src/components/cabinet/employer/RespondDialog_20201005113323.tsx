import React from 'react'
import { useTheme, useMediaQuery, Dialog, DialogTitle, Grid, Typography, IconButton, Divider } from '@material-ui/core';
import { TapeFetcherProvider } from '../../tape/TapeFetcherContext';
import { userToPost } from '../../../utils/tape-converters/user-to-tape-element';
import { SubscriptionBlock } from '../SubscriptionBlock';
import CloseIcon from '@material-ui/icons/Close';
import { RespondListTape } from './RespondsListTape';
import { userToPostResume } from '../../../utils/tape-converters/user-to-tape-resume-element';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/store';
import { getCountOfSearch } from '../../../utils/fetchFunctions';
import { searchCriteria, sortCriteria } from '../../../utils/search-criteria/builders';
import { ISearchCriteriaRequest, SearchCriteriaOperation, SortCriteriaDirection } from '../../../utils/search-criteria/types';

interface IRespondDialog {
    open: boolean,
    onClose: () => void,
    idVacancy: number,
    token: any
}

export const RespondDialogComp = (props: IRespondDialog) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const [countElems, setCountElems] = React.useState(0)

    const getCount = async () => {
        if (props.token) {
            alert("lklkl")
            const token = props.token;          
            const lastPostDate: string = new Date(Date.now()).toISOString()
            const requestData: ISearchCriteriaRequest = {
                searchCriteria: [
                    searchCriteria("respondVacancy", props.idVacancy, SearchCriteriaOperation.EQUAL),
                    searchCriteria("customers", true, SearchCriteriaOperation.EQUAL),
                    searchCriteria("createdDate", lastPostDate, SearchCriteriaOperation.LESS)                         
                ],
                sortCriteria: [
                    sortCriteria("viewName", SortCriteriaDirection.ASC)
                ]
            }
            const resultFetch: any = await getCountOfSearch(token, requestData, "/personal/getBySearchCriteria/count")
            setCountElems(resultFetch.result)
        }
    }

    React.useEffect(() => {
        getCount()
    }, [])
    
    return (
        <Dialog fullWidth  scroll="paper" open={props.open} onClose={props.onClose}>
            <TapeFetcherProvider dataConverterFunction={userToPostResume}>
                <DialogTitle style={{marginBottom:0, padding: theme.spacing(1), paddingLeft: theme.spacing(2)}}>
                    <Grid container alignItems="center" style={{padding:0}}>
                        <Typography style={{ fontWeight: "bold", flexGrow: 1 }}>
                            Отклики на вакансию ({countElems ? countElems : 0}):
                        </Typography>
                        <IconButton onClick={() => props.onClose()}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </DialogTitle>
                <Divider />
                <div style={{ overflowY: "auto" }}>
                    <RespondListTape idVacancy={props.idVacancy}></RespondListTape>
                </div>
            </TapeFetcherProvider>
        </Dialog>
    )
}

export const RespondDialog = connect(
    (state: RootState) => ({
        token: state.authReducer.token,
    })
)(RespondDialogComp)