import * as React from 'react';
import { Link, Typography, Grid } from '@material-ui/core';
import { dateParse } from '../../../utils/appliedFunc';

interface IJobApplicant{
    element: {
        startDate: string,
        stopDate: string,
        position: string,
        employer: string
    },
    link: string
}

export const JobApplicant = (props : IJobApplicant) => {
    return( 
        <Grid item container direction='row' alignItems='center' wrap='nowrap'>
            <Grid item>
                <Typography style={{width: '105px'}}>
                    с {dateParse(props.element.startDate)} по {props.element.stopDate ? dateParse(props.element.stopDate) : 'настоящее время'}                               
                </Typography>
            </Grid>
            <Grid item style={{marginLeft: '30px', flexWrap:'wrap'}}> 
                <Link
                    color='inherit'
                    underline='none'
                    href={props.link ? props.link : undefined}                   
                    style={{fontWeight:'bold'}}
                >
                    {props.element.employer} 
                </Link>               
                <Typography>
                    {props.element.position}                              
                </Typography>
            </Grid>       
        </Grid>       
    )
}