import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { Link } from '@material-ui/core';

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
            href={props.link}
        >
            {props.element ?
                (props.element.indexOf('null') == -1) ? props.element : 'Не задано' :
                'Не задано'}
        </Link>
    )
}