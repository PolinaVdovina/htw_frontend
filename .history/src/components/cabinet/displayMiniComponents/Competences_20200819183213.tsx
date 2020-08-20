import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { Typography } from '@material-ui/core';

interface ICompetences{
    element: {
        name: string
    }
}

export const Competences = (props : ICompetences) => {
    const context = React.useContext(CabinetContext);

    return(
        <Typography>
            {
                props.element.name ?
                    props.element.name : 
                    'Прочие компетенции' 
            }
        </Typography>
    )
}