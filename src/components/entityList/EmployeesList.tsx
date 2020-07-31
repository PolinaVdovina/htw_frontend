import * as React from 'react';
import { Grid, Typography, TextField, MenuItem, useTheme, Avatar } from '@material-ui/core';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { getEmployeesData } from '../../redux/reducers/entities-reducers';

interface IEmployeeList {
    token,
    employees,
    getEmployeesData: typeof getEmployeesData
}

function mapStateToProps(state : RootState) {
    let data =  {
        token: state.authReducer.token,
        employees: state.entitiesReducer.employees
    }       
    return data;
    
}

const mapDispatchToProps = {
    getEmployeesData,
}

export const EmployeeListRaw = (props : IEmployeeList) => {
    const theme = useTheme();
    React.useEffect(() => {
        props.getEmployeesData(props.token)
    }, [])
    return(
        <Grid style={{padding: theme.spacing(2)}} container direction='column'> 
        {props.employees.map(employee => 
            <Grid container direction='row' alignItems='center'>
                <Avatar></Avatar>
                <Typography style={{marginLeft: theme.spacing(2)}}>
                    {
                        (employee.name && employee.surname && employee.middlename) ?
                        employee.name ? employee.name : '' + ' ' +
                        employee.surname ? employee.surname : '' + ' ' +
                        employee.middlename ? employee.middlename : ''
                        : 'Не задано'
                    }
                </Typography>
            </Grid>
        )}            
        </Grid>
    )
}

export const EmployeeList = connect(mapStateToProps, mapDispatchToProps)(EmployeeListRaw);
