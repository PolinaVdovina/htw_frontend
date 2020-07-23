import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, TextField, Snackbar, Link } from '@material-ui/core';
import React, { useState } from 'react';
import { validateRegPasword, validateLogin } from '../../utils/validateFunctions';
import axios, { AxiosRequestConfig } from 'axios'
import { RootState } from '../../redux/store';
import { connect, useDispatch } from 'react-redux';
//import { startLoading as handleStartLoading, stopLoading as handleStopLoading } from '../../redux/reducers/dialog-reducers';
//import { login as handleLogin } from '../../redux/reducers/auth-reducers';


import { login as loginFetch, getJobSeekerFetch, getEmployerFetch } from './../../utils/fetchFunctions';
import { loginAction } from './../../redux/actions/auth-actions';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';
import { withSnackbar, useSnackbar } from 'notistack';
//import { stopLoading } from './../../redux/reducers/dialog-reducers';
import { fillPersonalDataAction } from './../../redux/actions/user-personals';
import { useTheme } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { urls } from '../../pages/urls';
import { useStyles } from './styles';
import { addressGlue } from '../../utils/appliedFunc';




interface ISignInCardProps {

}

function mapStateToProps(state : RootState) {
    return {
      isLoading: state.dialogReducer.isLoading,
    }
  }
  
  const mapDispatchToProps = {

  }



const SignInCardComp = (props: ISignInCardProps) => {
    const classes = useStyles();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState('');
    const dispatch = useDispatch();
    const theme = useTheme();
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
                const role = result.role;
                await dispatch(loginAction(login, result.token, 0, role));
            
                switch(role) {
                    case ("ROLE_JOBSEEKER"):
                        const jobSeekerData = await getJobSeekerFetch();
                        let address = addressGlue(jobSeekerData.address);

                        await dispatch(fillPersonalDataAction({
                            name: jobSeekerData.name, 
                            surname: jobSeekerData.surname, 
                            middlename: jobSeekerData.middlename, 
                            dateBirth: jobSeekerData.dateBirth, 
                            phone: jobSeekerData.phone, 
                            email: jobSeekerData.email,
                            about: jobSeekerData.about,
                            address: address,
                        }));
                        break;

                    case ("ROLE_EMPLOYER"):
                        const employerData = await getEmployerFetch();
                        let address1 = addressGlue(employerData.address);

                        await dispatch(fillPersonalDataAction({
                            name: employerData.name, 
                            phone: employerData.phone, 
                            email: employerData.email,
                            about: employerData.about,
                            address: address1,
                            inn: employerData.inn,
                            ogrn: employerData.ogrn
                        }));
                        break;
                }
                
                //alert(address);

                //alert(jobSeekerData.about);
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

export const SignInCard = withSnackbar( connect(mapStateToProps, mapDispatchToProps)(SignInCardComp) );