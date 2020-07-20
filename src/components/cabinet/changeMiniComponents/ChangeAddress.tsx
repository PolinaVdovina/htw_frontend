import * as React from 'react';
import { Grid, Typography, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface IChangeAddress {
    data: any,
    onChange: (any) => void
}


const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 }
]


export const ChangeAddress = (props : IChangeAddress) => {
    const [value, setValue] = React.useState();
    
    /*const func = () => {
        const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
        const token = "552dfb218ca6ea603908fc2391f8da0fa97a6cd6";
        const query = "москва хабар";
    
        const options = {
            method: "POST",
            //mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({query: query})
        };
    
        fetch(url, options)
            .then(response => response.text())
            .then(result => alert(result))
            .catch(error => alert(error));
    }*/

    return(
        <AddressSuggestions 
            token="552dfb218ca6ea603908fc2391f8da0fa97a6cd6" 
            value={value} 
            onChange={(event) => setValue} 
        />
    )
}


{/*<Autocomplete
            id="combo-box-demo"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            style={{ width: 180 }}
            renderInput={(params) => <TextField {...params}/>}
            //onChange={() => func()}
        />*/}