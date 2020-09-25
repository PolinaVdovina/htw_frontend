import * as React from 'react';
import { Button, Grid } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { connect, useDispatch } from 'react-redux';
import { RootState, store } from '../../../redux/store';
import { removeVacancyFetch, changePersonalDataFetch, toRespondFetch } from '../../../utils/fetchFunctions';
import { MessageStatus } from '../../../utils/fetchInterfaces';
import { Link } from '@material-ui/core';
import { fillPersonalDataAction } from '../../../redux/actions/user-personals';

export interface IRespondButton {
    token?: any,
    id: number,
    respondVacancies: Array<any>
}

interface fetchRespond {
    msgStatus,
    error?,
    vacancyDto?
}

function mapStateToProps(state : RootState) {
    return {
        respondVacancies: state.userPersonalsReducer.responseVacancies
    }
}

const RespondButtonComp = (props: IRespondButton) => {
    const [alreadyResponded, setAlreadyResponded] = React.useState(false);
    const snackbar = useSnackbar();
    const dispatch = useDispatch();

    React.useEffect(() => {
        props.respondVacancies.forEach(vacancy => {            
            if (props.id == vacancy.id)
                //setAlreadyResponded(true);
                alert('pidor')
        })
    }, [])

    const handleClick = async () => {
        const result: fetchRespond = await toRespondFetch(props.token, props.id.toString(), '/personal/respond');
        if (result.msgStatus == MessageStatus.OK) {
            snackbar.enqueueSnackbar("Вы откликнулись на выбранную вакансию", { variant: "success" })
            const newRespVacancy = [...props.respondVacancies, result.vacancyDto]
            dispatch(fillPersonalDataAction({responseVacancies: newRespVacancy}))
        }
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
                {alreadyResponded ? "Откликнуться" : "Вы откликнулись"}
            </Link>
        </Grid>
    )
}

export const RespondButton = connect(mapStateToProps)(RespondButtonComp)
