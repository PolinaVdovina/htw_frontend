import * as React from 'react';
import { FormControl, Select, MenuItem, Checkbox, ListItemText } from '@material-ui/core';

interface IChangeMultiSelect {
    onChange: (any) => void,
    list: string[],
    fullWidth?: boolean,
    value?,
    type: string
}

export const ChangeMultiSelect = (props : IChangeMultiSelect) => {
    const [personName, setPersonName] = React.useState<string[]>([]);
    return(      
        <FormControl 
            variant='outlined' 
            size='small' 
            
            style={{width: props.fullWidth ? "100%" : "250px"}}
        >
            <Select      
                multiline
                multiple               
                value={props.value ? props.value : personName}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    props.onChange({[props.type]: event.target.value as string[]})
                    
                    setPersonName(event.target.value as string[])
                }}               
                renderValue={(selected) => (selected as string[]).join(', ')}
            >
                {props.list.map((name, index) => (
                    <MenuItem key={index} value={name}>
                        <Checkbox checked={props.value ? (props.value.indexOf(name) > -1) : (personName.indexOf(name) > -1)} />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}