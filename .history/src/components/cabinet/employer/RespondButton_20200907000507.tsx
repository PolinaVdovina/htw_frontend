import * as React from 'react';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { RootState } from '../../../redux/store';
import { removeVacancyFetch } from '../../../utils/fetchFunctions';

export interface IRespondButton {
    data: number, //тут id вакансии
    token?: any
}

function mapStateToProps(state: RootState) {
    return {
      token: state.authReducer.token,
    }
}

export const RespondButtonRaw = (props: IRespondButton) => {
    const snackbar = useSnackbar();

    const handleClick = async () => {
        const result = await removeVacancyFetch(props.token, props.data);
        snackbar.enqueueSnackbar("Вы откликнулись на выбранную вакансию", { variant: "success" })
    }

    return(
        <Button
            variant="contained"
            onClick={handleClick} 
        >
            Откликнуться
        </Button>
    )
}

export const RespondButton = connect(mapStateToProps)(RespondButtonRaw);