import * as React from 'react';
import { Grid, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

interface IChangeBirth {
    
}

export const ChangeBirth = (props : IChangeBirth) => {
    const [age, setAge] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    return(
        <Grid item container direction='row' alignItems='flex-end'>
            <Grid item>
                <Typography>
                    Дата рождения 
                </Typography>
            </Grid>
            <Grid item style={{'paddingLeft': '10px'}}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">День</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChange}   
                        style={{'width': '60px'}}                     
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item style={{'paddingLeft': '10px'}}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Месяц</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChange}
                        style={{'width': '90px'}}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item style={{'paddingLeft': '10px'}}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Год</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChange}
                        style={{'width': '70px'}}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}