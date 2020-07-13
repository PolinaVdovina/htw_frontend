import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { validateRegPasword, /*validateRegLoginConnect*/ } from './validateFunctions';

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
        //setErrorLoginConnect(validateRegLoginConnect(loginConnect)['error']);
    }
    
    return (
        <Grid container justify='center' alignItems='center' direction='column'>
            <Grid item style={{'padding': '50px'}}>
                <Card className={classes.root}>
                    <Grid container direction="column" justify='center'>
                        <Grid item>
                            <Typography variant="h5" className={classes.title}>
                                Регистрация
                            </Typography>
                        </Grid>
                        <Grid item>
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
                        <Grid item>
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
                        <Grid item>
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
            </Grid>
        </Grid>
    )
}