import FacebookIcon from '@material-ui/icons/Facebook';
import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { Grid, Link } from '@material-ui/core';
import { NavLink, Link as RouterLink } from 'react-router-dom';


interface IFacebookLink{
    element: string,
    link: string
}

const ParseNikName = (urlString: string): string => {
    const url = new URL(urlString);
    if (url.searchParams.has('id')) {
        let id = url.searchParams.get('id')
        if (id === null)
            return urlString
        else
            return 'id' + id
    }
    else
        return urlString
}

export const FacebookLink = (props : IFacebookLink) => {
    return(
        <Grid container direction='row' alignItems='center'>
            <FacebookIcon/>
            <Link
                href={props.link}
                variant='h6'
                style={{marginLeft: '5px'}}
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