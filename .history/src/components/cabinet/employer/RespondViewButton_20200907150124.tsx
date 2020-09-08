import * as React from 'react';
import { Link, Grid, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { toRespondViewFetch } from '../../../utils/fetchFunctions';
import { MessageStatus } from '../../../utils/fetchInterfaces';

export interface IRespondViewButton {
    token?: any,
    id: number
}

export const RespondViewButton = (props: IRespondViewButton) => {
    const [open, setOpen] = React.useState(false);
    const snackbar = useSnackbar();

    const handleClick = async () => {
        const result = await toRespondViewFetch(props.token, props.id.toString(), '/vacancy/get-responds');
        if (result.msgStatus == MessageStatus.OK)
            setOpen(true);
        else
            snackbar.enqueueSnackbar("Ошибка", { variant: "error" })
    }

    return(<>
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>
                На вакансию откликнулись:
            </DialogTitle>
            <DialogContent>
                dfvdf
            </DialogContent>
        </Dialog>
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