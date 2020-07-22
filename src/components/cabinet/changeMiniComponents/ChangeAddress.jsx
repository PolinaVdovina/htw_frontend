import * as React from 'react';
import { Grid, Typography, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { prependOnceListener } from 'process';
import { stringify } from 'querystring';

/*interface IChangeAddress {
    data: any,
    onChange: (any) => void,
    type: string
}*/

function strParser(str/*: string*/) {
    let strArray = str.split(', ');
    for (let i = 0; i<strArray.length; i++) {
        if (strArray[i].endsWith('р-н'))
            strArray.splice(i, 1);
    }
    let data = {
        country: 'Россия',
        region: strArray[0] ? strArray[0] : '',
        city: strArray[1] ? strArray[1].replace('г ', '') : '',
        street: strArray[2] ? strArray[2] : '',
        house: strArray[3] ? strArray[3].replace('д ', '') : 0,
        flat: strArray[4] ? strArray[4].replace('кв ', '') : 0,
    };
    return data;
}

export const ChangeAddress = (props/* : IChangeAddress*/) => {
    return(
        <AddressSuggestions 
            token="552dfb218ca6ea603908fc2391f8da0fa97a6cd6" 
            onChange={(object) => {if (object) props.onChange(strParser(object.value))}}  
            //filterFromBound='city'//{props.type}
            //filterToBound='city'//{props.type}
            //filterLocations={{'city': 'г Норильск'}}         
        />
    )
}

