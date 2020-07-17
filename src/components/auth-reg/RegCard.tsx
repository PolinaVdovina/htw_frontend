import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, TextField, Select, FormControl, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { validateRegPasword, validateRegLoginConnect, validateLogin } from '../../utils/validateFunctions';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';
import { loginAction } from '../../redux/actions/auth-actions';
import { useDispatch } from 'react-redux';
import { login as loginFetch, register as registerFetch } from './../../utils/fetchFunctions';
import { useSnackbar } from 'notistack';

interface IRegCardProps {

}




const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            //maxWidth: "400px",
            width: "400px",
            textAlign: "center",
        },
        field: {
            width: '85%',
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

export const RegCard = (props: IRegCardProps) => {
    const classes = useStyles();
    const [login, setLogin] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginConnect, setLoginConnect] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const [errorRole, setErrorRole] = useState('');
    const [errorLogin, setErrorLogin] = useState('');
    const [errorLoginConnect, setErrorLoginConnect] = useState('');
    const snackBar = useSnackbar();
    const dispatch = useDispatch();
    async function validate() {
        const prePasswordErrorValidate = validateRegPasword(password);
        const preLoginErrorValidate = validateLogin(login);
        const preLoginConnectErrorValidate = validateRegLoginConnect(loginConnect)['error'];
        let typeLoginConnect = validateRegLoginConnect(loginConnect)['type'];
        setErrorPassword(prePasswordErrorValidate);
        setErrorLoginConnect(preLoginConnectErrorValidate);
        setErrorLogin(preLoginErrorValidate);
        let preConfirmPasswordErrorValidate = '';
        let preRoleErrorValidate = '';
        
        if(prePasswordErrorValidate == '' && password != confirmPassword) 
            preConfirmPasswordErrorValidate = 'Пароль не совпадает';
        if(role == '') 
            preRoleErrorValidate = 'Укажите роль';
        setErrorRole(preRoleErrorValidate);

        if (prePasswordErrorValidate == '' && preLoginErrorValidate == '' && preLoginConnectErrorValidate == '' && errorConfirmPassword == '' && preRoleErrorValidate =='') {
            dispatch(startLoadingAction());
            const result = await registerFetch(login, loginConnect, password, role);
     
            if(result.msgStatus == "ok") {
                dispatch(loginAction(login, result.token, 0, 0));
                snackBar.enqueueSnackbar("Пользователь успешно зарегистрирован", {variant: "success"});

            } else {
                snackBar.enqueueSnackbar("Такой пользователь уже существует", {variant: "error"});
            }
            dispatch(stopLoadingAction());
                   
            // let body = {
            //     login: login,
            //     password: password
            // }

            // if (typeLoginConnect) 
            //     body[typeLoginConnect] = loginConnect;

            // const postGet = {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(body)
            // };

            // fetch('auth/create', postGet)
            //     .catch(error => alert(error))
            //     .then(response=>{
            //         if (response) 
            //             return response.json();
            //     })
            //     .then(resp => {
            //         if (resp.error) {
            //             alert("Такой пользователь уже существует")
            //         }
            //         else {
            //             alert('Пользователь успешно зарегистрирован');
            //             localStorage.setItem('token', resp.token); 
            //             localStorage.setItem('login', resp.accountLogin);
            //             let params = (new URL(window.location.href)).searchParams; 
            //             localStorage.setItem('role', params.get("role") || '')                       
            //         }                  
            //     })
            
            //const axios = require('axios');
            /*axios({
                method: 'post',
                url: 'localhost:8080/api/auth/create',
                data: {
                login: login,
                password: password
                }
            }).then(response => {
                alert(response);
            }).catch(error => alert(error))*/
        }
        else {
            snackBar.enqueueSnackbar("Форма регистрации заполнена некорректно!", {variant: "error"});
        }        
    }
    
    return (
        <Card className={classes.root}>
            <Grid container direction="column" justify='center'>
                <Grid item>
                    <Typography variant="h5" className={classes.title}>
                        Регистрация
                    </Typography>
                </Grid>
                <Grid item className={classes.item}>
                    <TextField className={classes.field}
                        variant="outlined"
                        margin="normal"
                        required
                        placeholder='Номер телефона или e-mail'
                        error={errorLoginConnect!=''}
                        name="email"
                        helperText={errorLoginConnect}
                        autoComplete="login"
                        autoFocus
                        onChange={(event) => {setLoginConnect(event.target.value)}}
                    />
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
                <Grid item className={classes.item}>
                    <TextField className={classes.field}
                        variant="outlined"
                        margin="normal"
                        required
                        placeholder='Подтверждение пароля'
                        error={errorConfirmPassword!=''}
                        name="password"
                        helperText={errorConfirmPassword}
                        type="password"
                        id="confirmPassword"
                        onChange={(event) => {setConfirmPassword(event.target.value)}}
                    />
                </Grid>
                <Grid item className={classes.item}>
                    <TextField select className={classes.field}
                        variant="outlined"
                        margin="normal"
                        required
                        error={errorRole!=''}
                        helperText={errorRole}
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                        InputProps={{
                            style: {
                                textAlign: "left",
                            }
                        }}
                        label='Роль'>
                        <MenuItem value={"JOB_SEEKER"}>Соискатель</MenuItem>
                        <MenuItem value={"EDUCATION_INSTITUTION"}>Образовательное учреждение</MenuItem>
                        <MenuItem value={"EMPLOYER"}>Работодатель</MenuItem>
                    </TextField>
                </Grid>
                <Grid item style={{'padding': '20px'}}>
                    <Button className={classes.button}                                
                        variant="contained"
                        color="primary"
                        onClick={validate}
                    >
                        Регистрация
                    </Button>
                </Grid>
            </Grid>
        </Card>
    )
}