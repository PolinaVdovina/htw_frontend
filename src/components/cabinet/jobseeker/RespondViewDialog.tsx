import { Dialog, DialogTitle, Divider, Grid, IconButton, Typography } from '@material-ui/core';
import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { theme } from '../../../theme';
import { vacancyToPost } from '../../../utils/tape-converters/vacancy-to-tape-element';
import { TapeFetcherProvider } from '../../tape/TapeFetcherContext';
import { TapeWithFetcher } from '../../tape/TapeWithFetcher';
import { RootState } from '../../../redux/store';
import { searchCriteria } from '../../../utils/search-criteria/builders';
import { ISearchCriteria, SearchCriteriaOperation } from '../../../utils/search-criteria/types';
import { connect } from 'react-redux';

export interface IRespondViewDialog {
    open: boolean,
    onClose: () => void,
    login: string | null | undefined
}

function mapStateToProps(state: RootState) {
    return {
        login: state.authReducer.login
    }
}

const RespondViewDialogComp = (props: IRespondViewDialog) => {
    const additionalSearchCriteria = React.useMemo(
        () => {
            return [
                searchCriteria("jobSeekerRespondedLogin", props.login, SearchCriteriaOperation.EQUAL)
            ];
        },
        [props.login]
    )

    return(
        <Dialog fullWidth  scroll="paper" open={props.open} onClose={props.onClose}>
            <DialogTitle style={{marginBottom:0, padding: theme.spacing(1), paddingLeft: theme.spacing(2)}}>
                <Grid container alignItems="center" style={{padding:0}}>
                    <Typography style={{ fontWeight: "bold", flexGrow: 1 }}>
                        Вы откликались на вакансии
                    </Typography>
                    <IconButton onClick={props.onClose}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </DialogTitle>
            <Divider />
            <div style={{ overflowY: "auto" }}>
                <TapeWithFetcher 
                    url="/vacancy/getBySearchCriteria" 
                    additionalSearchCriteria={additionalSearchCriteria}
                    dataConverterFunction={vacancyToPost}
                    isRespondActive={false}
                ></TapeWithFetcher>
            </div>                       
        </Dialog>
    )
}

export const RespondViewDialog = connect(mapStateToProps)(RespondViewDialogComp)