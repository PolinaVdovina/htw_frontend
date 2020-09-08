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
        const result = await toRespondViewFetch(props.token, props.id, '/vacancy/get-responds');
        if (result.msgInfo.msgStatus == MessageStatus.OK) {
            setOpen(true);
            alert(JSON.stringify(result.tapeElements));
        }
        else
            snackbar.enqueueSnackbar("Ошибка", { variant: "error" })
    }

    return(<>
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>
                На вакансию откликнулись:
            </DialogTitle>
            <DialogContent>
                svs
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