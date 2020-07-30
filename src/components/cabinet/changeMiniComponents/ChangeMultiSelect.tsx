import * as React from 'react';
import { FormControl, Select, MenuItem, Checkbox, ListItemText } from '@material-ui/core';

interface IChangeMultiSelect {
    onChange: (any) => void,
    list: string[],
    fullWidth?: boolean,
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
                value={personName}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    props.onChange(event.target.value as string[])
                    setPersonName(event.target.value as string[])
                }}               
                renderValue={(selected) => (selected as string[]).join(', ')}
            >
                {props.list.map((name) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}