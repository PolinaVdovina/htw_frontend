import * as React from 'react';
import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { RootState, store } from '../../../redux/store';
import { removeVacancyFetch, changePersonalDataFetch } from '../../../utils/fetchFunctions';
import { MessageStatus } from '../../../utils/fetchInterfaces';

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
        //alert(props.data.title.toString().length)
        const result = await changePersonalDataFetch(props.data.description, props.data.title/*.toString()*/, '/personal/respond');
        if (result.msgStatus == MessageStatus.OK)
            snackbar.enqueueSnackbar("Вы откликнулись на выбранную вакансию", { variant: "success" })
        else
            snackbar.enqueueSnackbar("Ошибка", { variant: "error" })
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