import InstagramIcon from '@material-ui/icons/Instagram';
import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { Grid, Link } from '@material-ui/core';
import { NavLink, Link as RouterLink } from 'react-router-dom';

interface IInstagramLink{
    element: string,
    link: string
}

const ParseNikName = (url: string): string => {
    const mass: Array<string> = url.split('/')
    return mass[mass.length - 2]
}

export const InstagramLink = (props : IInstagramLink) => {
    return(
        <Grid container direction='row' alignItems='center'>
            <InstagramIcon/>
            <Link
                href={props.link}
                variant='h6'
                style={{marginleft: '5px'}}
            >
                {props.element ?
                    (props.element.indexOf('null') == -1) ? 
                        ParseNikName(props.element) : 
                        'Не задано' :
                    'Не задано'}
            </Link>
        </Grid>
        
    )
}