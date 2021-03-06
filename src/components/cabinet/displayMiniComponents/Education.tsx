import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import {  NavLink } from 'react-router-dom';
import { Typography, Grid, Link } from '@material-ui/core';
import { addressGlue, jobApplGlue, dateParseOnlyYear } from '../../../utils/appliedFunc';
import { ChangeComponentDialog } from '../ChangeComponentDialog';

interface IEducation{
    element: {
        institution: string,
        education: string,
        specialty: string,
        dateStart: string,
        dateReceiving: string
    },
    link: string
}

export const Education = (props : IEducation) => {
    const context = React.useContext(CabinetContext);
    const [openDialog, setOpenDialog] = React.useState(false);

    React.useEffect(() => {
        if (!props.element.dateStart && context && context.isMine)
            setOpenDialog(true);
    }, [])
    
    return( <>
        <ChangeComponentDialog 
            open={openDialog} 
            isCancelButtonInactive 
            role="INDIVIDUAL" 
            type="educationDamaged"
            handleClickClose={() => setOpenDialog(false)}
            data={props.element}
        />
        <Grid item container direction='row' alignItems='center' wrap='nowrap'>
            { !props.element.dateStart &&
                <Grid item>
                    <Typography>
                        Не задано
                    </Typography>
                </Grid>
            }
            { props.element.dateStart && <>
                <Grid item>
                    <Typography style={{width: '90px'}}>
                        {dateParseOnlyYear(props.element.dateStart)} - {props.element.dateReceiving ? dateParseOnlyYear(props.element.dateReceiving) : '...'}                               
                    </Typography>
                </Grid>
                <Grid item style={{marginLeft: '20px', flexWrap:'wrap'}}> 
                    <Link
                        component={NavLink}
                        to={props.link ? props.link : '#'}
                        color='inherit'
                        underline='none'                                    
                        style={{fontWeight:'bold'}} 
                    >             
                        {props.element.institution} 
                    </Link>               
                    <Typography>
                        {props.element.education}: {props.element.specialty}                                
                    </Typography>
                </Grid> 
            </>}      
        </Grid>       
    </> )
}
