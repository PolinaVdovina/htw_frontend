import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, TextField, Snackbar } from '@material-ui/core';
import React, { useState } from 'react';
import { validateRegPasword, validateLogin } from '../../utils/validateFunctions';
import axios, { AxiosRequestConfig } from 'axios'
import { RootState } from '../../redux/store';
import { connect, useDispatch } from 'react-redux';
//import { startLoading as handleStartLoading, stopLoading as handleStopLoading } from '../../redux/reducers/dialog-reducers';
//import { login as handleLogin } from '../../redux/reducers/auth-reducers';


import { login as loginFetch, getJobSeekerFetch } from './../../utils/fetchFunctions';
import { loginAction } from './../../redux/actions/auth-actions';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';
import { withSnackbar, useSnackbar } from 'notistack';
//import { stopLoading } from './../../redux/reducers/dialog-reducers';
import { fillJobSeekerPersonalAction } from './../../redux/actions/user-personals';




interface ISignInCardProps {

}

function mapStateToProps(state : RootState) {
    return {
      isLoading: state.dialogReducer.isLoading,
    }
  }
  
  const mapDispatchToProps = {

  }

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            //maxWidth: "400px",
            width: "400px",
            textAlign: "center",
        },
        field: {
            width: '85%'
        },
        button: {
            width: '60%',
        },
        title: {
            padding: '10px'
        },
        item: {
            width: '100%'
        }
  }),
);

const SignInCardComp = (props: ISignInCardProps) => {
    const classes = useStyles();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState('');
    const dispatch = useDispatch();
    const snackBar = useSnackbar();
    async function validate() {
        const preValidatePassword = validateRegPasword(password);
        const preValidateLogin = validateLogin(login);

        setErrorPassword(preValidatePassword);
        setErrorLogin(preValidateLogin);
        

        //alert(JSON.stringify(result))
        if (preValidatePassword == '' && preValidateLogin == '') {
            dispatch(startLoadingAction());
            const result = await loginFetch(login, password);
           
            if(result.msgStatus == "ok") {
                await dispatch(loginAction(login, result.token, 0, 0));
                const jobSeekerData = await getJobSeekerFetch();
                await dispatch(fillJobSeekerPersonalAction({
                    name: jobSeekerData.name, 
                    surname: jobSeekerData.surname, 
                    middlename: jobSeekerData.middlename, 
                    dateBirth: jobSeekerData.dateBirth, 
                    phone: jobSeekerData.phone, 
                    email: jobSeekerData.email
                }));
                snackBar.enqueueSnackbar("Вы успешно вошли", {variant: "success"});
                //alert('Вход выполнен');

            } else {
                snackBar.enqueueSnackbar("Неверный логин или пароль", {variant: "error"});
                //alert("Неверный логин или пароль")
            }
            dispatch(stopLoadingAction());
            
            //props.handleStartLoading();
            // const postGet = {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(body)
            // };

            // fetch('auth/login', postGet)
            //     .catch(error => alert(error))
            //     .then(response=>{
            //         if (response) 
            //             return response.json();
            //     })
            //     .then(resp => {
            //         if (resp.error) {
            //             alert("Неверный логин или пароль")
            //         }
            //         else {
            //             alert('Вход выполнен')  
            //             localStorage.setItem('token', resp.token); 
            //             localStorage.setItem('login', resp.accountLogin)  
            //         }                                                            
            //     })
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
                <Grid item style={{'padding': '20px'}}>
                    <Button className={classes.button}                                
                        variant="contained"
                        color="primary"
                        onClick={validate}
                    >
                        Войти
                    </Button>
                </Grid>
            </Grid>
        </Card>
    )
}

export const SignInCard = withSnackbar( connect(mapStateToProps, mapDispatchToProps)(SignInCardComp) );