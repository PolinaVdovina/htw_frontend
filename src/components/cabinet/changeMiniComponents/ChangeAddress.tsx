import * as React from 'react';
import { Grid, Typography, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface IChangeAddress {
    
}


const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 }
]


export const ChangeAddress = (props : IChangeAddress) => {
    return(
        <Autocomplete
            id="combo-box-demo"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            style={{ width: 180 }}
            renderInput={(params) => <TextField {...params}/>}
        />
    )
}