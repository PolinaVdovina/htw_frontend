import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, TextField, Select, FormControl, MenuItem, Link } from '@material-ui/core';
import React, { useState } from 'react';
import { validateRegPasword, validateRegLoginConnect, validateLogin, validateEmailString } from '../../utils/validateFunctions';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';
import { loginAction } from '../../redux/actions/auth-actions';
import { useDispatch, connect } from 'react-redux';
import { loginFetch as loginFetch, registerFetch as registerFetch } from './../../utils/fetchFunctions';
import { useSnackbar } from 'notistack';
import { fillPersonalDataAction } from '../../redux/actions/user-personals';
import { useStyles } from './styles';
import { urls } from '../../pages/urls';
import { Link as RouterLink, Redirect, useRouteMatch } from 'react-router-dom';
import { register } from './../../redux/reducers/auth-reducers';
import { RootState } from '../../redux/store';

interface IRegCardProps {
    register: typeof register
}

function mapStateToProps(state : RootState) {
    return {
     
    }
}

const mapDispatchToProps = {
    register,
}

const RegCardComp = (props: IRegCardProps) => {

    const routeMatch = useRouteMatch();
    const urlRole = routeMatch.params['role'];

    const classes = useStyles();
    const [login, setLogin] = useState('');
    const [role, setRole] = useState(urlRole);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginConnect, setLoginConnect] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const [errorRole, setErrorRole] = useState('');
    const [errorLogin, setErrorLogin] = useState('');
    const [errorLoginConnect, setErrorLoginConnect] = useState('');
    const [nameOrg, setNameOrg] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const snackBar = useSnackbar();
    const dispatch = useDispatch();

    async function validate() {
        const prePasswordErrorValidate = validateRegPasword(password);
        const preLoginErrorValidate = validateLogin(login);
        //const preLoginConnectErrorValidate = validateRegLoginConnect(loginConnect)['error'];

        const validatedEmail = validateEmailString(loginConnect).isValid;
        const preLoginConnectErrorValidate = validatedEmail ? "" : "Введите корректный e-mail"
        //let typeLoginConnect = validateRegLoginConnect(loginConnect)['type'];
        setErrorPassword(prePasswordErrorValidate);
        setErrorLoginConnect(preLoginConnectErrorValidate);
        setErrorLogin(preLoginErrorValidate);
        let preConfirmPasswordErrorValidate = '';
        let preRoleErrorValidate = '';
        
        if(prePasswordErrorValidate == '' && password != confirmPassword)  {
            preConfirmPasswordErrorValidate = 'Пароль не совпадает';
            
        }
        if(role == '') {
            preRoleErrorValidate = 'Укажите роль';

        }
        setErrorRole(preRoleErrorValidate);
        setErrorConfirmPassword(preConfirmPasswordErrorValidate);
        if (prePasswordErrorValidate == '' && preLoginErrorValidate == '' && preLoginConnectErrorValidate == '' && preConfirmPasswordErrorValidate == '' && preRoleErrorValidate =='') {
            //props.register(login, password, role, typeLoginConnect=='phone' ? loginConnect : null, typeLoginConnect=='email' ? loginConnect : null, undefined, nameOrg != '' ? nameOrg : null )
            //props.register(login, password, role, null, loginConnect, undefined, nameOrg != '' ? nameOrg : null )
            dispatch(startLoadingAction());
            const fetch = await registerFetch(login, loginConnect, null, password, role,nameOrg != '' ? nameOrg : null);
            if(fetch.msgStatus != "ok") {
                if(fetch.error == "NOT_ORIGINAL_LOGIN")
                    snackBar.enqueueSnackbar("Данный логин занят", {variant: "error"});
                else
                    if(fetch.error == "NOT_ORIGINAL_EMAIL")
                snackBar.enqueueSnackbar("Данный email занят", {variant: "error"});
            }
            else 
                setRegisterSuccess(true);
            dispatch(stopLoadingAction());
            //props.register(login, password, role, null, loginConnect, undefined, nameOrg != '' ? nameOrg : null, false )
        }
        else {
            snackBar.enqueueSnackbar("Форма регистрации заполнена некорректно!", {variant: "error"});
        }        
    }
    
    return (
        <Card className={classes.root}>
            {registerSuccess && <Redirect to={urls.accountActivation.shortPath}/>}
            <Grid container direction="column" justify='center'>
                <Grid item>
                    <Typography variant="h5" className={classes.title}>
                        Регистрация
                    </Typography>
                </Grid>
                <Grid item className={classes.item}>
                    <TextField select className={classes.field}
                        variant="outlined"
                        margin="normal"
                        required
                        autoFocus
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
                        <MenuItem value={"ROLE_JOBSEEKER"}>Соискатель</MenuItem>
                        <MenuItem value={"ROLE_INSTITUTION"}>Образовательное учреждение</MenuItem>
                        <MenuItem value={"ROLE_EMPLOYER"}>Работодатель</MenuItem>
                    </TextField>
                </Grid>
                <Grid item className={classes.item}>
                    <TextField className={classes.field}
                        variant="outlined"
                        margin="normal"
                        required
                        //placeholder='Номер телефона или e-mail'
                        placeholder='Электронная почта'
                        error={errorLoginConnect!=''}
                        name="email"
                        helperText={errorLoginConnect}
                        autoComplete="login"
                        
                        onChange={(event) => {setLoginConnect(event.target.value)}}
                    />
                </Grid>

                { (role == 'ROLE_INSTITUTION' || role == 'ROLE_EMPLOYER') &&
                <Grid item className={classes.item}>
                    <TextField className={classes.field}
                        variant="outlined"
                        margin="normal"
                        required
                        //error={errorLogin!=''}
                        placeholder='Наименование'
                        //id="email"
                        //helperText={errorLogin}
                        //autoComplete="login"                                
                        onChange={(event) => {setNameOrg(event.target.value)}}
                    />                            
                </Grid>                   
                }

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
                <Grid item container className={classes.submitContainer} >
           
                        <Button className={classes.button}                                
                            variant="contained"
                            color="primary"
                            onClick={validate}
                        >
                            Регистрация
                        </Button>
                   
                    <Link component={RouterLink} to={urls.authentication.shortPath}>
                        Авторизация
                    </Link>
                </Grid>
            </Grid>
        </Card>
    )
}

export const RegCard = connect(mapStateToProps, mapDispatchToProps)(RegCardComp);