import * as React from 'react';
import { Grid, Typography, TextField, MenuItem } from '@material-ui/core';

interface IChangeExperience {
    onChange: (any) => void,
    type: string
    fullWidth?: boolean,
    value?: any
}

export const listItems = (maxNum: number): string[] => {
    let result = ['нет опыта', 'меньше года'];
    for (let i = 1; i <= maxNum; i++) 
        result.push(numToStr(i));
    return result;
}

export function numToStr(numExperience: number): string {
	let txt;
	let count = numExperience % 100;
	if (count >= 5 && count <= 20) {
		txt = 'лет';
	} else {
		count = count % 10;
		if (count == 1) {
			txt = 'год';
		} else if (count >= 2 && count <= 4) {
			txt = 'года';
		} else {
			txt = 'лет';
		}
	}
	return numExperience + " " + txt;
}



export const ChangeExperience = (props : IChangeExperience) => {
    return(
        <TextField
          select
          size='small'
          value={props.value}
          onChange={(event) => props.onChange({[props.type]: event.target.value})}
          variant='outlined'
          style={{width: props.fullWidth ? "100%" : "150px"}}
        >
            {listItems(20).map(element => 
                <MenuItem value={element}>
                    {element}
                </MenuItem>
            )}
        </TextField>
    )
}
