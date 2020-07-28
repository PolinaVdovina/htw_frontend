import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, TextField, Snackbar, Link } from '@material-ui/core';
import React, { useState } from 'react';
import { validateRegPasword, validateLogin } from '../../utils/validateFunctions';
import axios, { AxiosRequestConfig } from 'axios'
import { RootState } from '../../redux/store';
import { connect, useDispatch } from 'react-redux';
//import { startLoading as handleStartLoading, stopLoading as handleStopLoading } from '../../redux/reducers/dialog-reducers';
//import { login as handleLogin } from '../../redux/reducers/auth-reducers';



import { loginAction } from './../../redux/actions/auth-actions';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';
import { withSnackbar, useSnackbar } from 'notistack';


//import { stopLoading } from './../../redux/reducers/dialog-reducers';
import { useTheme } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { urls } from '../../pages/urls';
import { useStyles } from './styles';
import { login } from './../../redux/reducers/auth-reducers';




interface ISignInCardProps {
    login: typeof login
}

function mapStateToProps(state : RootState) {
    return {
      isLoading: state.dialogReducer.isLoading,
    }
  }
  
  const mapDispatchToProps = {
    login,
  }



const SignInCardComp = (props: ISignInCardProps) => {
    const classes = useStyles();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState('');
    const dispatch = useDispatch();
    const theme = useTheme();

    async function validate() {
        const preValidatePassword = validateRegPasword(password);
        const preValidateLogin = validateLogin(login);

        setErrorPassword(preValidatePassword);
        setErrorLogin(preValidateLogin);
        

        //alert(JSON.stringify(result))
        if (preValidatePassword == '' && preValidateLogin == '') {
            props.login(login,password)
        }       
    }
    
    return (
        <Card className={classes.root}>
            <Grid container direction="column" justify='center'>
                <Grid item>
                    <Typography variant="h5" className={classes.title}>
                        Вход
                    </Typography>
                </Grid>
                <Grid item className={classes.item}>
                    <TextField className={classes.field}
                        variant="outlined"
                        margin="normal"
                        required
                        error={errorLogin!=''}
                        placeholder='Логин'
                        id="email"
                        helperText={errorLogin}
                        autoComplete="login"   
                        autoFocus                             
                        onChange={(event) => {setLogin(event.target.value)}}
                    />                            
                </Grid>
                <Grid item className={classes.item}>
                    <TextField className={classes.field}
                        variant="outlined"
                        margin="normal"
                        required
                        placeholder='Пароль'
                        error={errorPassword!=''}
                        name="password"
                        helperText={errorPassword}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => {setPassword(event.target.value)}}
                    />
                </Grid>
                <Grid item container className={classes.submitContainer} >
                    
                    <Button className={classes.button}                                
                        variant="contained"
                        color="primary"
                        onClick={validate}
                    >
                        Войти
                    </Button>
                    <Link component={RouterLink} to={urls.registration.shortPath}>
                        Зарегистрироваться
                    </Link>
                </Grid>
            </Grid>
        </Card>
    )
}

export const SignInCard = connect(mapStateToProps, mapDispatchToProps)(SignInCardComp);