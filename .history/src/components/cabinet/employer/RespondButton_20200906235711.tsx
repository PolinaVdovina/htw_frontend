import * as React from 'react';
import { Button } from '@material-ui/core';

export interface IRespondButton {
    data: number //тут id вакансии
  }

export const RespondButton = () => {
    const handleClick = () => {
        alert(data)
    }

    return(
        <Button
            variant="contained"
            onClick={handleClick} 
        >
            Откликнуться
        </Button>
    )
}