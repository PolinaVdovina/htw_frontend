import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { Link, Typography, Grid } from '@material-ui/core';
import { addressGlue, jobApplGlue, dateParseOnlyYear } from '../../../utils/appliedFunc';

interface IEducation{
    element: {
        institutionName: string,
        education: string,
        specialty: string,
        dateStart: string,
        dateReceiving: string
    }
}

export const Education = (props : IEducation) => {
    return( 
        <Grid item container direction='row'>
            <Grid item>
                <Typography>
                    {dateParseOnlyYear(props.element.dateStart)} - {dateParseOnlyYear(props.element.dateReceiving)}                               
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    {props.element.institutionName}         
                </Typography>
                <Typography>
                    {props.element.education}: {props.element.specialty}                                
                </Typography>
            </Grid>       
        </Grid>       
    )
}