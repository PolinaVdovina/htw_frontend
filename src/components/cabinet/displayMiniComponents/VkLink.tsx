import Icon28LogoVk from '@vkontakte/icons/dist/28/logo_vk';
import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { Grid, Link } from '@material-ui/core';

interface IVkLink{
    element: string,
    link: string
}

const ParseNikName = (url: string): string => {
    const mass: Array<string> = url.split('/')
    if (mass[3]) {
        const userId = mass[3]
        if (userId)    
            return userId;
        else 
            return url;
    }
    else
        return url;        
}

export const VkLink = (props : IVkLink) => {
    return(
        <Grid container direction='row' alignItems='center'>
            <Icon28LogoVk color='black' width={24}/>
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