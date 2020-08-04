import * as React from 'react';
import { Grid, Typography, TextField, MenuItem, useTheme, Avatar, Link, IconButton, Button } from '@material-ui/core';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { getEmployeesData } from '../../redux/reducers/entities-reducers';
import AddIcon from '@material-ui/icons/Add';
import { RegMiniComponent } from './RegMiniComponent';

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
    const [hiddenChangeComponent, setHiddenChangeComponent] = React.useState(false)

    React.useEffect(() => {
        props.getEmployeesData(props.token)
    }, [])

    const handleClickSave = () => {
        props.getEmployeesData(props.token)
    }

    const handleClickClose = () => {
        setHiddenChangeComponent(false)
    }

    const handleClickOpen = () => {
        setHiddenChangeComponent(true)
    }

    return(
        <Grid style={{padding: theme.spacing(2)}} container direction='column'> 
        {props.employees[0] &&
        props.employees.map(employee => 
            <Grid item container style={{padding: theme.spacing(1)}} direction='row' alignItems='center'>
                <Avatar></Avatar>
                <Link 
                    //component='button' 
                    style={{marginLeft: theme.spacing(2)}} 
                    href={employee.login}
                    //href='/vfv'
                    color='inherit'
                    underline='none'
                    variant='h6'
                >
                    {
                        (employee.name || employee.surname || employee.middlename) ?
                        ((employee.name ? employee.name : '') + ' ' +
                        (employee.middlename ? employee.middlename : '') + ' ' +
                        (employee.surname ? employee.surname : ''))
                        : employee.login
                    }
                </Link>
            </Grid>
        )} 
            <Grid item container justify='center'>
                <IconButton style={{width: '50px'}} onClick={() => handleClickOpen()}>
                    <AddIcon/>
                </IconButton> 
            </Grid>  
        {hiddenChangeComponent &&
            <RegMiniComponent
                handleClickClose={handleClickClose}
                handleClickSave={handleClickSave}
            />
        }                    
        </Grid>
    )
}

export const EmployeeList = connect(mapStateToProps, mapDispatchToProps)(EmployeeListRaw);
