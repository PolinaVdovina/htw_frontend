import React from 'react'
import { SubscriptionBlock } from './SubscriptionBlock'
import { Dialog, Typography, useTheme, Divider, IconButton, Grid, useMediaQuery, DialogTitle } from '@material-ui/core';
import { TapeFetcherProvider } from '../tape/TapeFetcherContext';
import { userToPost } from '../../utils/tape-converters/user-to-tape-element';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
export const SubscriptionDialog = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    return (
        <Dialog fullWidth  scroll="paper" open={props.open} onClose={props.onClose}>
            <TapeFetcherProvider dataConverterFunction={userToPost}>
                <DialogTitle style={{marginBottom:0, padding: theme.spacing(1), paddingLeft: theme.spacing(2)}}>
                    <Grid container alignItems="center" style={{padding:0}}>
                        <Typography style={{ fontWeight: "bold", flexGrow: 1 }}>
                            {props.subscription ? "Подписки" : "Подписчики"}
                        </Typography>
                        <IconButton onClick={() => props.onClose()}>
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </DialogTitle>
                <Divider />
                <div style={{ overflowY: "auto" }}>
                    <SubscriptionBlock subscription={props.subscription} />
                </div>
            </TapeFetcherProvider>
        </Dialog>
    )
}