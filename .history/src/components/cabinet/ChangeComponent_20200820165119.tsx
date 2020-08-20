import * as React from 'react';
import { Grid, Typography, TextField, Button, createStyles, Theme, makeStyles } from '@material-ui/core';
import { SETTINGS } from './accountSettings';
import { useTheme } from '@material-ui/core';
import { withSnackbar, WithSnackbarProps } from 'notistack';
import { IMessageInfo, MessageStatus } from '../../utils/fetchInterfaces';
import { useDispatch } from 'react-redux';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';

type FinalProps = IChangeComponent & WithSnackbarProps;

export interface IChangeComponent {
    handleClickSave: () => void,
    handleClickClose: () => void,
    type: string,
    role: string
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
    const validFunc = SETTINGS[props.role][props.type].validateFunction;
    const changeFunc = SETTINGS[props.role][props.type]['changeFunction'];

    const [data, setData] = React.useState({});
    const theme = useTheme();
    const dispatch = useDispatch();
    const onChange = (inputData: any) => {
        setData({...data, ...inputData});     
    } 

    const validateAndSave = async() => {
        //alert(JSON.stringify(data))
        if (validFunc && !validFunc(data))
            props.enqueueSnackbar('Поле заполнено неверно', {variant: "error"})
        else {
            
            if(changeFunc)
            {
                await dispatch(startLoadingAction());
                const result = await changeFunc(dispatch, data);
                await dispatch(stopLoadingAction());
                if(result.msgStatus == MessageStatus.OK) {
                    props.enqueueSnackbar('Данные сохранены', {variant: "success"});
                    props.handleClickClose();
                }
                else {
                    props.enqueueSnackbar('Не удалось изменить данные из-за проблем с соединением', {variant: "error"})
                }
            }
            else {
                props.enqueueSnackbar('Данные сохранены', {variant: "success"});
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
                <Button 
                    variant="contained"
                    style={{'margin': theme.spacing(1)}}
                    onClick={(event) => props.handleClickClose()}  
                >
                    Отменить
                </Button>
            </Grid>
        </Grid>
    )
}

export const ChangeComponent = withSnackbar(ChangeComponentRaw)