import * as React from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { SETTINGS } from './accountSettings';

interface IChangeComponent {
    handleClickSave: () => void,
    handleClickClose: () => void,
    type: string,
    role: string
}

export const ChangeComponent = (props : IChangeComponent) => {
    const Component = SETTINGS[props.role][props.type].changeComponent;
    const changeSettings = SETTINGS[props.role][props.type].changeSettings;
    const validFunc = SETTINGS[props.role][props.type].validateFunction;

    const [data, setData] = React.useState('');

    //const 

    const validateAndSave = () => {
        
        alert(validFunc());
        //props.handleClickClose();
    }

    return (
        <Grid item container direction='column' justify='flex-start' style={{'padding': '7px'}}>
            
            { Component &&
                Object.keys(changeSettings).map(key => 
                    <Grid item container direction='row' alignItems='center' justify='space-between'>
                        <Grid item>
                            <Typography>
                                {changeSettings[key].title}
                            </Typography>
                        </Grid>
                        <Grid item style={{'paddingLeft': '10px', 'flexGrow': 1}}>
                            { <Component/>}
                        </Grid>
                    </Grid>
                )
            }            
            <Grid item style={{'paddingTop': '10px'}}>
                <Button 
                    variant="contained"
                    color="primary" 
                    style={{'margin': '5px'}}
                    onClick={(event) => validateAndSave()}
                >
                    Сохранить
                </Button>
                <Button 
                    variant="contained"
                    style={{'margin': '5px'}}
                    onClick={(event) => props.handleClickClose()}  
                >
                    Отменить
                </Button>
            </Grid>
        </Grid>
    )
}