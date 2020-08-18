import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { Link } from '@material-ui/core';

interface ISimpleLink{
    type: string
}

export const SimpleLink = (props : ISimpleLink) => {
    const context = React.useContext(CabinetContext);

    return(
        <Link
            color='inherit'
            underline='none'
            href={context.links[props.type]}
        >
            {context[props.type] ?
                (context[props.type].indexOf('null') == -1) ? context[props.type] : 'Не задано' :
                'Не задано'}
        </Link>
    )
}