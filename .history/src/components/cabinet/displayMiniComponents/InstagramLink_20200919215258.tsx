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
    alert(mass[mass.length - 1])
    return ''
}

export const InstagramLink = (props : IInstagramLink) => {
    return(
        <Grid container direction='row'>
            <InstagramIcon/>
            <Link
                color='inherit'
                underline='none'
                href={props.link}
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