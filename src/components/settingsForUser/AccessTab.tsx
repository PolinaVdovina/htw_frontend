import * as React from 'react';
import { createStyles, Grid, Link, makeStyles, Switch, Theme, Typography, useTheme } from '@material-ui/core';
import { ChangeComponent } from '../cabinet/ChangeComponent';
import { useDispatch, connect } from 'react-redux';
import { changeSettingsAction } from '../../redux/actions/settings-actions';
import { RootState } from '../../redux/store';
import { useSnackbar } from 'notistack';
import { changePersonalDataFetch, getEmployeesListFetch } from '../../utils/fetchFunctions';
import { IMessageInfo, MessageStatus } from '../../utils/fetchInterfaces';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        typography: {
            width: '300px'
        },
    }),
);

const mapStateToProps = (state: RootState) => ({
    role: state.authReducer.entityType,
    token: state.authReducer.token
})

const AccessTabComp = (props) => {
    const theme = useTheme();
    const classes = useStyles();
    const snackbar = useSnackbar();
    const dispatch = useDispatch();
    const [openChange, setOpenChange] = React.useState("");

    React.useEffect(() => {

    }, [])

    return( 
        <Grid style={{padding: theme.spacing(2)}} container direction='column'> 
            <Grid item container alignContent="flex-start" direction="column" style={{marginTop: theme.spacing(2)}}>
            { !openChange &&
                    <Link 
                        component='button' 
                        variant='h6'
                        align="left"
                        onClick={() => setOpenChange("changePassword")}
                    >
                        Сменить пароль
                    </Link>
                }
                { !openChange &&
                    <Link 
                        align="left"
                        component='button' 
                        variant='h6'
                        onClick={() => setOpenChange("changeEmail")}
                    >
                        Сменить электронную почту
                    </Link>
                }
                { openChange == "changePassword" &&
                    <ChangeComponent
                        handleClickClose={() => setOpenChange("")}
                        role='SETTINGS_PERSONAL'
                        type='password'
                    />
                }
                { openChange == "changeEmail" &&
                    <ChangeComponent
                        handleClickClose={() => setOpenChange("")}
                        role='SETTINGS_PERSONAL'
                        type='email'
                    />
                }
            </Grid>
        </Grid>
    )
}

export const AccessTab = connect(mapStateToProps)(AccessTabComp)
         