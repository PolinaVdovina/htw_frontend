import * as React from 'react';
import { FormControl, Select, MenuItem, Checkbox, ListItemText } from '@material-ui/core';

interface IChangeTypesEdu {
    data: string,
    onChange: (any) => void,
    type: string
}

const names = [
    'среднее профессиональное',
    'бакалавриат',
    'специалитет',
    'магистратура',
    'подготовка кадров высшей квалификации',
    'повышение квалификации',
    'курсы',
  ];

export const ChangeTypesEdu = (props : IChangeTypesEdu) => {
    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPersonName(event.target.value as string[]);
    };

    return(
        /*<TextField 
            size='small' 
            variant='outlined' 
            value={props.data[props.type]} 
            onChange={(event) => props.onChange({[props.type]: event.target.value})}
        />*/         
        <FormControl 
            variant='outlined' 
            size='small' 
            style={{width:"250px"}}
        >
            <Select                
                multiple               
                value={personName}
                onChange={handleChange}               
                renderValue={(selected) => (selected as string[]).join(', ')}
            >
                {names.map((name) => (
                <MenuItem key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}