import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { Typography } from '@material-ui/core';

interface ISimpleTypography{
    type: string
}

export const SimpleTypography = (props : ISimpleTypography) => {
    const context = React.useContext(CabinetContext);

    return(
        <Typography>
            {
                (context[props.type] ?
                    (context[props.type].indexOf('null') == -1) ? context[props.type] : 'Не задано' :
                    'Не задано')
            }
        </Typography>
    )
}