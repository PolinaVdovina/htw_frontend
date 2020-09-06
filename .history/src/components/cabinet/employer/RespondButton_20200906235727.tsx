import * as React from 'react';
import { Button } from '@material-ui/core';

export interface IRespondButton {
    data: number //тут id вакансии
  }

export const RespondButton = (props: IRespondButton) => {
    const handleClick = () => {
        alert(props.data)
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