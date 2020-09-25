import * as React from 'react';
import { Button, Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { RootState, store } from '../../../redux/store';
import { removeVacancyFetch, changePersonalDataFetch, toRespondFetch } from '../../../utils/fetchFunctions';
import { MessageStatus } from '../../../utils/fetchInterfaces';
import { Link } from '@material-ui/core';

export interface IRespondButton {
    token?: any,
    id: number
}

function mapStateToProps(state : RootState) {
    return {
        respondVacancies: state.userPersonalsReducer.responseVacancies
    }
}

export const RespondButton = (props: IRespondButton) => {
    const snackbar = useSnackbar();

    const handleClick = async () => {
        const result = await toRespondFetch(props.token, props.id.toString(), '/personal/respond');
        if (result.msgStatus == MessageStatus.OK)
            snackbar.enqueueSnackbar("Вы откликнулись на выбранную вакансию", { variant: "success" })
        else
            snackbar.enqueueSnackbar("Ошибка", { variant: "error" })
    }

    return(
        <Grid container alignItems='center'>
            <Link
                component='button'
                onClick={handleClick} 
                style={{marginRight: '17px', fontSize: '15px'}}
                underline='none'
            >
                Откликнуться
            </Link>
        </Grid>
    )
}
