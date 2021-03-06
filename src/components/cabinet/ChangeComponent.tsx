import * as React from 'react';
import { Grid, Typography, TextField, Button, createStyles, Theme, makeStyles } from '@material-ui/core';
import { SETTINGS } from './accountSettings';
import { useTheme } from '@material-ui/core';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { IMessageInfo, MessageStatus } from '../../utils/fetchInterfaces';
import { useDispatch } from 'react-redux';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';
import { IValidateResult } from '../../utils/validateFunctions';

type FinalProps = IChangeComponent & WithSnackbarProps;

export interface IChangeComponent {
    handleClickClose: () => void,
    type: string,
    role: string,
    isCancelButtonInactive?: boolean,
    data?: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      
      
    },
  }),
);

export const ChangeComponentRaw = (props : FinalProps) => {
    //const Component = SETTINGS[props.role][props.type].changeComponent;
    const changeSettings = SETTINGS[props.role][props.type].changeSettings;
    //const ignoreSuccessNotification = SETTINGS[props.role][props.type].ignoreSuccessNotification;
    const successMessage = SETTINGS[props.role][props.type].successMessage;
    const ignoreSuccessMessage = SETTINGS[props.role][props.type].ignoreSuccessMessage;
    const validFunc: (any) => IValidateResult = SETTINGS[props.role][props.type].validateFunction;
    const changeFunc = SETTINGS[props.role][props.type]['changeFunction'];

    const [data, setData] = React.useState({});
    const theme = useTheme();
    const dispatch = useDispatch();
    const onChange = (inputData: any) => {
        setData({...data, ...inputData});     
    } 

    const validateAndSave = async() => {
        //alert(JSON.stringify(data))
        if (validFunc && !validFunc(data).isValid) {
            validFunc(data).errorsMass.map(errorMsg =>
                props.enqueueSnackbar(errorMsg, {variant: "error"})
            )
        }            
        else {            
            if(changeFunc)
            {
                await dispatch(startLoadingAction());
                const result = await changeFunc(dispatch, data);
                await dispatch(stopLoadingAction());
                if(result.msgStatus == MessageStatus.OK) {
                    if(ignoreSuccessMessage != true)
                        props.enqueueSnackbar(successMessage ? successMessage : 'Данные сохранены', {variant: "success"});
                    props.handleClickClose();
                }
                else {
                    props.enqueueSnackbar('Не удалось изменить данные', {variant: "error"})
                }
            }
            else {
                if(ignoreSuccessMessage != true)
                    props.enqueueSnackbar(successMessage ? successMessage : 'Данные сохранены', {variant: "success"});
                props.handleClickClose();
            }
        }           
    }

    return (
        <Grid item container direction='column' spacing={1} >
            { changeSettings &&
                Object.keys(changeSettings).map(key => {
                    const Component = changeSettings[key].changeComponent;
                    return(
                        <Grid item container direction='row'  alignItems='baseline'>
                            <Grid item >
                                <Typography style={{overflowWrap:"normal", width:"150px"}} >
                                    {changeSettings[key].title}
                                </Typography>
                            </Grid>
                            <Grid item style={{flexGrow:1}} >
                                { Component &&
                                    <Component 
                                        onChange={onChange} 
                                        data={data} 
                                        type={key} 
                                        list={changeSettings[key].listItemsSelect}
                                        disabled={changeSettings[key].disabled ? changeSettings[key].disabled : false}
                                        defaultValue={changeSettings[key].isFilled ? props.data[key] : false}
                                        maxDateOffset={changeSettings[key].maxDateOffset ? changeSettings[key].maxDateOffset : 0 }
                                    />
                                }
                            </Grid>
                        </Grid>
                    )
                })
            }            
            <Grid item style={{'paddingTop': theme.spacing(2)}}>
                <Button 
                    variant="contained"
                    color="primary" 
                    style={{'margin': theme.spacing(1)}}
                    onClick={(event) => validateAndSave()}
                >
                    Сохранить
                </Button>
                { !props.isCancelButtonInactive &&
                    <Button 
                        variant="contained"
                        style={{'margin': theme.spacing(1)}}
                        onClick={(event) => props.handleClickClose()}  
                    >
                        Отменить
                    </Button>
                }
            </Grid>
        </Grid>
    )
}

export const ChangeComponent = withSnackbar(ChangeComponentRaw)