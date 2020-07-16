import * as React from 'react';
import { Grid, Typography, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface IChangeAddress {
    
}

interface IAddressField {
    title: string
}

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 }
]


const settings = {
    'country': {
        'title': 'Страна'
    },
    'region': {
        'title': 'Регион'
    },
    'city': {
        'title': 'Город'
    },
    'street': {
        'title': 'Улица'
    },
    'house': {
        'title': 'Дом'
    },
    'flat': {
        'title': 'Квартира/офис'
    }
}


const AddressField = (props : IAddressField) => {
    return(
        <Grid item container direction='row' alignItems='center' justify='space-between'>
            <Grid item>
                <Typography>
                    {props.title}
                </Typography>
            </Grid>
            <Grid item style={{'paddingLeft': '10px'}}>
                <Autocomplete
                    id="combo-box-demo"
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    style={{ width: 180 }}
                    renderInput={(params) => <TextField {...params}/>}
                />
            </Grid>
        </Grid>
    )
}



export const ChangeAddress = (props : IChangeAddress) => {
    return(
        <Grid container direction='column' style={{'width': '320px'}}>
            {
                Object.keys(settings).map(key => 
                    <AddressField title={settings[key].title}/>
                )
            }            
        </Grid>
    )
}