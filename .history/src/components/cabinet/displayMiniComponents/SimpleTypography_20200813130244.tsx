import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { Typography } from '@material-ui/core';

interface ISimpleTypography{
    key: string
}

export const SimpleTypography = (props : ISimpleTypography) => {
    const context = React.useContext(CabinetContext);

    return(
        <Typography>
            {alert(props.key)}
            wveververv
            {
                /*(context[props.key] ?
                    (context[props.key].indexOf('null') == -1) ? context[props.key] : 'Не задано' :
                    'Не задано')*/
            }
        </Typography>
    )
}