import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { validateRegPasword, validateLogin } from './validateFunctions';

interface ISignInCard {

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

export const SignInCard = (props: ISignInCard) => {
    const classes = useStyles();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    //const [loginConnect, setLoginConnect] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState('');
    //const [errorLoginConnect, setErrorLoginConnect] = useState('');

    function validate() {
        setErrorPassword(validateRegPasword(password));
        setErrorLogin(validateLogin(login));

        if (errorPassword == '' && errorLogin == '') {
            let body = {
                accountLogin: login,
                password: password
            }

            const postGet = {
                method: 'POST',
                headers: {
                //'Authorization': 'Bearer '+ store.getState().auth.token,
                'Accept': 'application/text',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };

            fetch('http://127.0.0.1:8080/api/auth/login', postGet).then(response=>alert('вход выполнен')).catch(error => alert(error))
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