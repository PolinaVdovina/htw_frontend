import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { Link } from '@material-ui/core';
import { NavLink, Link as RouterLink } from 'react-router-dom';

interface ISimpleLink{
    element: string,
    link: string
}

export const SimpleLink = (props : ISimpleLink) => {
    const context = React.useContext(CabinetContext);

    return(
        <Link
            color='inherit'
            underline='none'
            component = {RouterLink}
            to={props.link}
        >
            {props.element ?
                (props.element.indexOf('null') == -1) ? props.element : 'Не задано' :
                'Не задано'}
        </Link>
    )
}