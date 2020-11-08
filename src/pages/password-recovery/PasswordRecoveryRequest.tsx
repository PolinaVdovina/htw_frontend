import React from 'react'
import { VHCenterizingGrid } from '../grid-containers/VHCenterizingGrid';
import { PaddingPaper } from '../../components/cards/PaddingPaper';
import { Button, Grid, Typography, TextField, Link, useTheme } from '@material-ui/core';
import { Link as RouterLink, useRouteMatch, Route } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { MessageType } from '../../components/chat/OLD/chatEnums';
import { validateNewPassword, validateRegPasword, validateEmail } from '../../utils/validateFunctions';
import EmailIcon from '@material-ui/icons/Email';
import { urls } from '../urls';
import { recoveryPasswordByEmailFetch } from '../../utils/fetchFunctions';
import { useDispatch } from 'react-redux';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';

interface ITypeNewPasswordProps {
    onSuccess: (email: string) => void;
}

const TypeEmailForRecovery = (props: ITypeNewPasswordProps) => {
    const theme = useTheme();
    const [email, setEmail] = React.useState("");
    const [error, setError] = React.useState("");

    const snackBar = useSnackbar();

    const validateForm = () => {
        return validateEmail({email}).isValid;
    }

    const clickHandler = () => {
        if(validateForm()) {
            props.onSuccess(email);
        } else {
            setError("Введите корректную почту")
        }
    }

    
    return (
        <VHCenterizingGrid>
            <PaddingPaper style={{minWidth: "360px", 
                padding:theme.spacing(6), 
                paddingTop: theme.spacing(3),
                paddingBottom: theme.spacing(3)}}
            >
                <Grid container direction="column" justify='center'>
                    <Grid item>
                        <Typography variant="h5" align="center">
                            Восстановление пароля
                        </Typography>
                    </Grid>
                    <Grid item >
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            required
                            id="email"
                            value={email}
                            error={error!=''}
                            helperText={error}
                            placeholder='Электронная почта'
                            autoFocus                             
                            onChange={(event) => {
                                setError("");
                                setEmail(event.target.value)}
                            }
                        />                            
                    </Grid>
                    <Grid item container alignItems="center">
                        <Button 
                        style={{flexGrow:1}}                       
                        variant="contained"
                        color="primary"
                        onClick={clickHandler}
                        >
                                Востановить пароль
                            </Button>

                            <Link 
                            style={{paddingLeft: theme.spacing(2)}}
                            component={RouterLink} to={urls.authentication.shortPath}

                            >
                                Авторизация
                            </Link>
                    </Grid>
                </Grid>
            </PaddingPaper>
        </VHCenterizingGrid>
    )
}


const AwaitLinkForRecovery = (props) => {
    const theme = useTheme();
    return (
        <VHCenterizingGrid>
            <PaddingPaper>
                <Grid container direction="column" style={{maxWidth: 500}}>
                    <Typography variant="h4" style={{marginBottom: theme.spacing(2)}}>
                        Смена пароля
                    </Typography>
                    <Typography style={{marginBottom: theme.spacing(5)}}>
                        На вашу электронную почту пришло сообщение с ссылкой. Перейдите по данной ссылке, чтобы смените пароль.
                    </Typography>
                    <Grid item style={{alignSelf: "flex-end"}}>
                        <EmailIcon color="primary"/>
                    </Grid>
                </Grid>
            </PaddingPaper>
        </VHCenterizingGrid>
        )
}

export const PasswordRecoveryRequest = () => {
    const [emailTyped, setEmailTyped] = React.useState(false);
    const snackBar = useSnackbar();
    const dispatch = useDispatch();
    const onEmailTyped = async(email: string) => {
        await dispatch(startLoadingAction());
        const isOk = await recoveryPasswordByEmailFetch(email);
        if(isOk) 
            setEmailTyped(true);
        else
            snackBar.enqueueSnackbar("Не удалось найти пользователя", { variant: "error" });
        await dispatch(stopLoadingAction());

    }

    return emailTyped ? 
        <AwaitLinkForRecovery/>
        :
        <TypeEmailForRecovery onSuccess={(email) => onEmailTyped(email)}/>
}