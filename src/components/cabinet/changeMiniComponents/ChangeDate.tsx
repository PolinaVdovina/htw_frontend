import * as React from 'react';
import { Grid, Typography, TextField, Button, makeStyles, Theme, createStyles } from '@material-ui/core';
import {
	DatePicker,
	TimePicker,
	DateTimePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { addYears } from 'date-fns';

interface IChangeDate {
	data: string,
	onChange: (any) => void,
	type: string,
	maxDateOffset?: number
}

export const ChangeDate = (props: IChangeDate) => {
	const maxDateOffset = props.maxDateOffset ? props.maxDateOffset : 0;
	return (
		<>
			<DatePicker
				required
				inputVariant="outlined"
				maxDate={addYears(new Date(), maxDateOffset)}
				okLabel="Принять"
				cancelLabel="Отмена"
				size="small"
				openTo="year"
				defaultValue={null}
				format="dd.MM.yyyy"
				views={["year", "month", "date"]}
				onChange={(date) => props.onChange({ [props.type]: date && date.toISOString().split('T')[0] })}
				value={props.data[props.type] ? Date.parse(props.data[props.type]) : null}
			/>
			/* 		<TextField
						id="date"
						type="date"			
						InputLabelProps={{
							shrink: true,
						}}
						variant='outlined'
						size='small'
						value={props.data[props.type]}
						onChange={(event) => props.onChange({[props.type]: event.target.value})}
					/> */
		</>
	);
}