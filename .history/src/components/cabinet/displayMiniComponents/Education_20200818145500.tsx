import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { Link, Typography, Grid } from '@material-ui/core';
import { addressGlue, jobApplGlue, dateParseOnlyYear } from '../../../utils/appliedFunc';
import { NavLink } from 'react-router-dom';

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
    return( 
        <Grid item container direction='row' alignItems='center' wrap='nowrap'>
            <Grid item>
                <Typography style={{width: '90px'}}>
                    {dateParseOnlyYear(props.element.dateStart)} - {props.element.dateReceiving ? dateParseOnlyYear(props.element.dateReceiving) : '...'}                               
                </Typography>
            </Grid>
            <Grid item style={{marginLeft: '20px', flexWrap:'wrap'}}> 
                <Link
                    color='inherit'
                    underline='none'
                    component={NavLink}
                    href={props.link ? props.link : undefined}                   
                    style={{fontWeight:'bold'}}
                >
                    {props.element.institution} 
                </Link>               
                <Typography>
                    {props.element.education}: {props.element.specialty}                                
                </Typography>
            </Grid>       
        </Grid>       
    )
}