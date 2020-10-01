import * as React from 'react';
import { Link, Grid, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { toRespondViewFetch } from '../../../utils/fetchFunctions';
import { MessageStatus } from '../../../utils/fetchInterfaces';
import { Tape } from '../../tape/Tape';
import { ITapeElementData } from '../../tape/posts/TapeElement';
import { RespondDialog } from './RespondDialog';

export interface IRespondViewButton {
    token?: any,
    id: number
}

export const RespondViewButton = (props: IRespondViewButton) => {
    const [open, setOpen] = React.useState(false);
    //const [elements, setElements] = React.useState(new Array<ITapeElementData>())
    const snackbar = useSnackbar();

    const handleClick = async () => {
        setOpen(true);
    }

    return(<>
        <RespondDialog 
            open={open} 
            onClose={() => setOpen(false)}
            idVacancy={props.id}
        />
        <Grid container alignItems='center'>
            <Link
                component='button'
                onClick={handleClick} 
                style={{marginRight: '17px', fontSize: '15px'}}
                underline='none'
            >
                Отклики
            </Link>
        </Grid>
    </>)
}