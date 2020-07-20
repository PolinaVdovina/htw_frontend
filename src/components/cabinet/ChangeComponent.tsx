import * as React from 'react';
import { Grid, Typography, TextField, Button, createStyles, Theme, makeStyles } from '@material-ui/core';
import { SETTINGS } from './accountSettings';
import { useTheme } from '@material-ui/core';

interface IChangeComponent {
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

export const ChangeComponent = (props : IChangeComponent) => {
    const Component = SETTINGS[props.role][props.type].changeComponent;
    const changeSettings = SETTINGS[props.role][props.type].changeSettings;
    const validFunc = SETTINGS[props.role][props.type].validateFunction;

    const [data, setData] = React.useState('');
    const theme = useTheme();

    //const 

    const validateAndSave = () => {
        
        alert(validFunc());
        //props.handleClickClose();
    }

    return (
        <Grid item container direction='column'  spacing={1}>
            
            { Component &&
                Object.keys(changeSettings).map(key => 
                    <Grid item container direction='row'  alignItems='center'>
                        <Grid item >
                            <Typography style={{overflowWrap:"normal", width:"150px"}} >
                                {changeSettings[key].title}
                            </Typography>
                        </Grid>
                        <Grid item >
                            { <Component/>}
                        </Grid>
                    </Grid>
                )
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