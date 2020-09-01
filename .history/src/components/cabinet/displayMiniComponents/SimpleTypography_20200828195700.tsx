import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { Typography } from '@material-ui/core';

interface ISimpleTypography{
    element: string,
    type?: string
}

export const SimpleTypography = (props : ISimpleTypography) => {
    const context = React.useContext(CabinetContext);

    return(
        <Typography>
            { !props.type &&
                (props.element ?
                    (props.element.indexOf('null') == -1) ? props.element : 'Не задано' :
                    'Не задано')
            }
            { props.type &&
                (context[props.type] ?
                    (context[props.type].indexOf('null') == -1) ? context[props.type] : 'Не задано' :
                    'Не задано')
            }
        </Typography>
    )
}