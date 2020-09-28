import Icon28LogoVk from '@vkontakte/icons/dist/28/logo_vk';
import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { Grid, Link } from '@material-ui/core';
import { NavLink, Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { validateWebLink } from '../../../utils/validateFunctions';

interface IVkLink{
    element: string,
    link: string
}

const ParseNikName = (url: string): string => {
    const mass: Array<string> = url.split('/')
    if (mass[mass.length - 1]) {
        const userId = mass[mass.length - 1]
        if (userId && userId.match(/^id[0-9]+$/))    
            return userId;
        else 
            return url;
    }
    else
        return url;        
}

export const VkLink = (props : IVkLink) => {
    const snackbar = useSnackbar();

    return(
        <Grid container direction='row' alignItems='center'>
            <Icon28LogoVk color='black' width={24}/>
            <Link
                href={validateWebLink(props.link) ? props.link : ''}
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