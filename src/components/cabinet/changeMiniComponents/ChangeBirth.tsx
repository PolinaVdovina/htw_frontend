import * as React from 'react';
import { Grid, Typography, TextField, Select, MenuItem, FormControl, InputLabel, withStyles, Theme, createStyles } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

interface IChangeBirth {
    
}

export const ChangeBirth = (props : IChangeBirth) => {
    const [day, setDay] = React.useState('');
    const [month, setMonth] = React.useState('');
    const [year, setYear] = React.useState('');

    const handleChangeDay = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDay(event.target.value as string);
    };

    const handleChangeMonth = (event: React.ChangeEvent<{ value: unknown }>) => {
        setMonth(event.target.value as string);
    };

    const handleChangeYear = (event: React.ChangeEvent<{ value: unknown }>) => {
        setYear(event.target.value as string);
    };

    const days = () => {
        let array: Array<number> = [];
        for (let i: number = 1; i <= 31; i++)
            array.push(i);
        return array;
    }

    const years = () => {
        let array: Array<number> = [];
        let currentYear = new Date().getFullYear();
        for (let i: number = 1901; i <= currentYear; i++)
            array.push(i);
        return array;
    }

    const months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ]

    return(
        <Grid item container direction='row' alignItems='flex-end'>
            <Grid item>
                <FormControl>
                    
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={day}
                        onChange={handleChangeDay}   
                        input={<BootstrapInput />}                
                    >
                        {
                            days().map(value => 
                                <MenuItem value={value}>{value}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item style={{'paddingLeft': '10px'}}>
                <FormControl>
                    
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={month}
                        onChange={handleChangeMonth}
                        style={{'width': '115px'}}
                        input={<BootstrapInput />}
                    >
                        {
                            months.map(value => 
                                <MenuItem value={value}>{value}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item style={{'paddingLeft': '10px'}}>
                <FormControl>
                    
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={year}
                        onChange={handleChangeYear}
                        style={{'width': '75px'}}
                        input={<BootstrapInput />}
                    >
                        {
                            years().map(value => 
                                <MenuItem value={value}>{value}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}