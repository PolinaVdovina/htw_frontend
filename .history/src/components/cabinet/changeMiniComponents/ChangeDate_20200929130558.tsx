import * as React from 'react';
import { Grid, Typography, TextField, Button, makeStyles, Theme, createStyles } from '@material-ui/core';

interface IChangeDate {
    data: string,
	onChange: (any) => void,
	type: string
}

export const ChangeDate = (props: IChangeDate) => {
	return (
		<TextField
			id="date"
			type="date"			
			InputLabelProps={{
				shrink: true,
			}}
			variant='outlined'
			size='small'
			value={props.data[props.type]}
			onChange={(event) => props.onChange({[props.type]: event.target.value})}
			required
		/>
	);
}