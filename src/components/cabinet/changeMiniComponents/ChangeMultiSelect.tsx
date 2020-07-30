import * as React from 'react';
import { FormControl, Select, MenuItem, Checkbox, ListItemText } from '@material-ui/core';

interface IChangeMultiSelect {
    data: string[],
    onChange: (any) => void,
    type: string,
    list: string[]
}

export const ChangeMultiSelect = (props : IChangeMultiSelect) => {
    const [personName, setPersonName] = React.useState<string[]>([]);

    return(      
        <FormControl 
            variant='outlined' 
            size='small' 
            style={{width:"250px"}}
        >
            <Select                
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