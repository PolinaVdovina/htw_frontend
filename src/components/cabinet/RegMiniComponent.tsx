import * as React from 'react';
import { Grid, Typography, TextField, useTheme, Button } from '@material-ui/core';
import { RootState } from '../../redux/store';
import { connect, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { validateLogin, validateRegPasword } from '../../utils/validateFunctions';
import { IMessageInfo, MessageStatus } from '../../utils/fetchInterfaces';
import { addEmployeeFetch } from '../../utils/fetchFunctions';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';


interface IRegMiniComponent {
    token,
    handleClickClose: () => any,
    handleClickSave: () => any,
    role?: string
}

function mapStateToProps(state : RootState) {
    let data =  {
        token: state.authReducer.token
    }       
    return data;   
}

const RegMiniComponentRaw = (props : IRegMiniComponent) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');
    const snackBar = useSnackbar();
    
    const validateAndSave = async () => {
        const errorLogin = validateLogin(login);
        const errorPassword = validateRegPasword(password);
        if (errorLogin == '' && errorPassword == '') {
            await dispatch(startLoadingAction());
            /*************/
            let msgInfo: IMessageInfo;
            if (props.role) 
                msgInfo = await addEmployeeFetch(props.token, {login, password});
            else
                msgInfo = await addEmployeeFetch(props.token, {login, password});
                alert("I'm student!")
            /************/
            await dispatch(stopLoadingAction());
            if(msgInfo.msgStatus == MessageStatus.OK) {
                props.handleClickSave();
                snackBar.enqueueSnackbar('Учетная запись создана', {variant: 'success'});
                props.handleClickClose();
            }
            else {
                snackBar.enqueueSnackbar('Не удалось изменить данные из-за проблем с соединением', {variant: "error"})
            }                      
        }
        else {
            if (errorLogin != '') snackBar.enqueueSnackbar(errorLogin, {variant: "error"});
            if (errorPassword != '') snackBar.enqueueSnackbar(errorPassword, {variant: "error"});
        }
    }

    return(
        <Grid item container direction='column' spacing={1}>
            <Grid item>
                <Typography>
                    Пожалуйста, заполните данные для создания 
                    учетной записи.
                </Typography>
            </Grid>
            <Grid item container direction='row'  alignItems='center'>
                <Grid item >
                    <Typography style={{overflowWrap:"normal", width:"70px"}} >
                        Логин
                    </Typography>
                </Grid>
                <Grid item style={{flexGrow:1}} >
                    <TextField 
                        variant='outlined' 
                        size='small'
                        value={login}
                        onChange={(event) => setLogin(event.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid item container direction='row'  alignItems='center'>
                <Grid item >
                    <Typography style={{overflowWrap:"normal", width:"70px"}} >
                        Пароль
                    </Typography>
                </Grid>
                <Grid item style={{flexGrow:1}} >
                    <TextField 
                        variant='outlined' 
                        size='small'
                        value={password}
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Grid>
            </Grid>      
            <Grid item style={{'paddingTop': theme.spacing(2)}}>
                <Button 
                    variant="contained"
                    color="primary" 
                    style={{'margin': theme.spacing(1)}}
                    onClick={(event) => validateAndSave()}
                >
                    Сохранить
                </Button>
                <Button 
                    variant="contained"
                    style={{'margin': theme.spacing(1)}}
                    onClick={(event) => props.handleClickClose()}  
                >
                    Отменить
                </Button>
            </Grid>
        </Grid>
    )
}

export const RegMiniComponent = connect(mapStateToProps)(RegMiniComponentRaw);