import * as React from 'react';
import { Grid, Typography, TextField, MenuItem, useTheme, Avatar, Link, IconButton, Button } from '@material-ui/core';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { getEmployeesData } from '../../redux/reducers/entities-reducers';
import AddIcon from '@material-ui/icons/Add';
import { RegMiniComponent } from './RegMiniComponent';
import { CabinetContext } from '../cabinet/cabinet-context';

interface IEmployeeList {
    token,
    entities,
    getEmployeesData: typeof getEmployeesData
}

function mapStateToProps(state : RootState) {
    let data =  {
        token: state.authReducer.token,
        entities: state.entitiesReducer.entities
    }       
    return data;
    
}

const mapDispatchToProps = {
    getEmployeesData,
}

export const EmployeeListRaw = (props : IEmployeeList) => {
    const theme = useTheme();
    const [hiddenChangeComponent, setHiddenChangeComponent] = React.useState(false)
    const context = React.useContext(CabinetContext);

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
        {props.entities[0] &&
        props.entities.map(entity => 
            <Grid item container style={{padding: theme.spacing(1)}} direction='row' alignItems='center'>
                <Avatar></Avatar>
                <Link 
                    style={{marginLeft: theme.spacing(2)}} 
                    href={entity.login}
                    color='inherit'
                    underline='none'
                    variant='h6'
                >
                    {
                        (entity.name || entity.surname || entity.middlename) ?
                        ((entity.name ? entity.name : '') + ' ' +
                        (entity.middlename ? entity.middlename : '') + ' ' +
                        (entity.surname ? entity.surname : ''))
                        : entity.login
                    }
                </Link>
            </Grid>
        )} 
        { context.isMine &&    
            <Grid item container justify='center'>
                <IconButton style={{width: '50px'}} onClick={() => handleClickOpen()}>
                    <AddIcon/>
                </IconButton> 
            </Grid> 
        } 
        { hiddenChangeComponent &&
            <RegMiniComponent
                handleClickClose={handleClickClose}
                handleClickSave={handleClickSave}
            />
        }                    
        </Grid>
    )
}

export const EmployeeList = connect(mapStateToProps, mapDispatchToProps)(EmployeeListRaw);
