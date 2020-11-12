import React from 'react'
import { VHCenterizingGrid } from '../grid-containers/VHCenterizingGrid';
import { PaddingPaper } from '../../components/cards/PaddingPaper';
import { Button, Grid, Typography, TextField, Link } from '@material-ui/core';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { MessageType } from '../../components/chat/OLD/chatEnums';
import { validateNewPassword, validateRegPasword } from '../../utils/validateFunctions';
import { changePasswordByTokenFetch } from '../../utils/fetchFunctions';
import { urls } from '../urls';
import { Redirect } from 'react-router';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';
import { useDispatch } from 'react-redux';

interface ITypeNewPasswordProps {
}

export const TypeNewPassword = (props: ITypeNewPasswordProps) => {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const [passwordError, setPasswordError] = React.useState("");
    const [confirmPasswordError, setConfirmPasswordError] = React.useState("");

    const [success, setSuccess] = React.useState(false);
    const routeMatch = useRouteMatch();
    const token = routeMatch.params['token'];
    const dispatch = useDispatch();
    const snackBar = useSnackbar();

    const validateForm = () => {
        if (validateRegPasword(password) != "") {
            setPasswordError(validateRegPasword(password));
            snackBar.enqueueSnackbar("Форма заполнена неверно!", { variant: "error" });
            return false;
        }  else  if(password != confirmPassword) {
            setConfirmPasswordError("Пароли не совпадают!")
            snackBar.enqueueSnackbar("Форма заполнена неверно!", { variant: "error" });
            return false;
        } 
        return true;
    }

    const clickHandler = async () => {
        if(validateForm()) {
            await dispatch(startLoadingAction());
            const isOk = await changePasswordByTokenFetch(token, password);
            if(isOk) {
                setSuccess(true);
                snackBar.enqueueSnackbar("Пароль успешно изменен", { variant: "success" });
            }
            else
                snackBar.enqueueSnackbar("Не удалось поменять пароль", { variant: "error" });
            await dispatch(stopLoadingAction());
        }
    }

    
    return (
        <VHCenterizingGrid>
            {
                success && <Redirect to={urls.authentication.shortPath}/>
            }
            <PaddingPaper style={{minWidth: 360}}>
                <Grid container direction="column" justify='center'>
                    <Grid item>
                        <Typography variant="h5" align="center">
                            Смена пароля
                        </Typography>
                    </Grid>
                    <Grid item >
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            required
                            type="password"
                            autoComplete="new-password"
                            value={password}
                            error={passwordError!=''}
                            helperText={passwordError}
                            placeholder='Новый пароль'
                            autoFocus                             
                            onChange={(event) => {
                                setPasswordError("");
                                setConfirmPasswordError("");
                                setPassword(event.target.value)}
                            }
                        />                            
                    </Grid>
                    <Grid item >
                        <TextField
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            required
                            value={confirmPassword}
                            autoComplete="new-password"
                            type="password"
                            placeholder='Подтвердите пароль'
                            error={confirmPasswordError!=''}
                            helperText={confirmPasswordError}                      
                            onChange={(event) => {
                                setPasswordError("");
                                setConfirmPasswordError("");
                                setConfirmPassword(event.target.value)
                            }}
                        />                            
                    </Grid>
                    <Grid item container>
                        
                        <Button   
                            fullWidth                            
                            variant="contained"
                            color="primary"
                            onClick={clickHandler}
                        >
                            Сменить пароль
                        </Button>
                    </Grid>
                </Grid>
            </PaddingPaper>
        </VHCenterizingGrid>
    )
}