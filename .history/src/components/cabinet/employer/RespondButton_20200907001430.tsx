import * as React from 'react';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { RootState, store } from '../../../redux/store';
import { removeVacancyFetch } from '../../../utils/fetchFunctions';

export interface IRespondButton {
    data: {
        title: any,//тут id вакансии
        description: any //тут токен
     } 
    //token?: any
}

/*function mapStateToProps(state: RootState) {
    return {
      token: state.authReducer.token,
    }
}*/

export const RespondButton/*Raw*/ = (props: IRespondButton) => {
    const snackbar = useSnackbar();

    const handleClick = async () => {
        const result = await removeVacancyFetch(props.data.description, props.data.title);
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

//export const RespondButton = connect(mapStateToProps)(RespondButtonRaw);