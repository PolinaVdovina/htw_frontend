import * as React from 'react';
import { Grid, Typography, TextField, Button, makeStyles, Theme, createStyles, IconButton } from '@material-ui/core';
import {
	DatePicker,
	TimePicker,
	DateTimePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { addYears } from 'date-fns';
import CancelIcon from '@material-ui/icons/Cancel';

interface IChangeDate {
	data: string,
	onChange: (any) => void,
	type: string,
	maxDateOffset?: number
}

export const ChangeDate = (props: IChangeDate) => {
	const maxDateOffset = props.maxDateOffset ? props.maxDateOffset : 0;
	return (
		<Grid container alignItems="center"> 
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
			<IconButton onClick={() => props.onChange({[props.type]: null})}>
				<CancelIcon/>
			</IconButton>
		</Grid>
	);
}