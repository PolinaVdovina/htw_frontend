import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { validateRegPasword, validateRegLoginConnect, validateLogin } from '../../utils/validateFunctions';

interface IRegCardProps {

}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            //maxWidth: "400px",
            width: "400px",
            height: "40%"
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

export const RegCard = (props: IRegCardProps) => {
    const classes = useStyles();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginConnect, setLoginConnect] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState('');
    const [errorLoginConnect, setErrorLoginConnect] = useState('');

    function validate() {
        setErrorPassword(validateRegPasword(password));
        setErrorLoginConnect(validateRegLoginConnect(loginConnect)['error']);
        let typeLoginConnect = validateRegLoginConnect(loginConnect)['type'];
        setErrorLogin(validateLogin(login));

        if (errorPassword == '' && errorLogin == '' && errorLoginConnect == '') {
                   
            let body = {
                login: login,
                password: password
            }

            if (typeLoginConnect) 
                body[typeLoginConnect] = loginConnect;

            const postGet = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };

            fetch('auth/create', postGet)
                .catch(error => alert(error))
                .then(response=>{
                    if (response) 
                        return response.json();
                })
                .then(resp => {
                    if (resp.error) {
                        alert("Такой пользователь уже существует")
                    }
                    else {
                        alert('Пользователь успешно зарегистрирован');
                        localStorage.setItem('token', resp.token); 
                        localStorage.setItem('login', resp.accountLogin);
                        let params = (new URL(window.location.href)).searchParams; 
                        localStorage.setItem('role', params.get("role") || '')                       
                    }                  
                })
            
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