import * as React from 'react';
import { Grid, Typography, TextField, Button, makeStyles, Theme, createStyles } from '@material-ui/core';


{/*import DateFnsUtils from '@date-io/date-fns'; 
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

export const ChangeBirth = (props) => {
    const [selectedDate, handleDateChange] = React.useState(new Date());
    
	return(
		{/*<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<DatePicker value={selectedDate} onChange={handleDateChange} />
		</MuiPickersUtilsProvider>}
    )
}*/}

interface IChangeBirth {
    data: string,
	onChange: (any) => void,
	type: string
}

export const ChangeBirth = (props: IChangeBirth) => {
	return (
		<TextField
			id="date"
			type="date"			
			InputLabelProps={{
				shrink: true,
			}}
			variant='outlined'
			size='small'
			value={props.data}
			//defaultValue="2017-05-24"
			onChange={(event) => props.onChange({[props.type]: event.target.value})}
		/>
	);
}