import * as React from 'react';
import { Grid, Typography, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { prependOnceListener } from 'process';

interface IChangeAddress {
    data: any,
    onChange: (any) => void
}

export const ChangeAddress = (props : IChangeAddress) => {
    const [value, setValue] = React.useState();

    return(
        <AddressSuggestions 
            token="552dfb218ca6ea603908fc2391f8da0fa97a6cd6" 
            onChange={(object) => props.onChange(object?.value)}             
        />
    )
}

