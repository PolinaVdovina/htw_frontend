import { Dialog, DialogTitle } from '@material-ui/core';
import * as React from 'react';

export interface IRespondViewDialog {
    open: boolean,
    onClose: (any) => void

}


export const RespondViewDialog = (props: IRespondViewDialog) => {
    return(
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Title</DialogTitle>
        </Dialog>
    )
}