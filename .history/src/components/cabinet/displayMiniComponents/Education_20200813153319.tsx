import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { Link, Typography } from '@material-ui/core';
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
    return( <>
        <Typography>
            {props.element.institutionName}: 
            {props.element.education}                        
        </Typography>
        <Typography>
            {props.element.specialty}     
            {dateParseOnlyYear(props.element.dateStart)} - 
            {dateParseOnlyYear(props.element.dateReceiving)}   
        </Typography>
    </>)
}