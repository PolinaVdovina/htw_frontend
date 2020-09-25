import * as React from 'react';
import { useTheme, Grid, Button, Typography, Divider, Dialog } from '@material-ui/core';
import { TapeFetcher } from '../tape/TapeFetcher_OLD';
import { TapeFetcherProvider } from '../tape/TapeFetcherContext';
import { userToPost } from '../../utils/tape-converters/user-to-tape-element';

interface IExecuteDialogButton {
    title: string,
    DialogComponent: any,
    dialogProps?: any | null
}

interface IExecuteDialogButtonProps {
    title: string,
    DialogComponent: any,
    dialogProps?: any | null
}

export const ExecuteDialogButton = (props: IExecuteDialogButtonProps) => {
    //const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    return (
        <Grid container alignItems="center" direction="row" style={{ flexWrap: "nowrap", overflow: "hidden" }}>
            <props.DialogComponent open={open} onClose={() => setOpen(false)} {...props.dialogProps}></props.DialogComponent>
            <Typography style={{/*'color': '#808080', fontWeight:"bold", */  flexGrow: 1, paddingLeft: theme.spacing(2), }}>
                {props.title}
            </Typography>
            <Button color="primary"
                style={{ borderRadius: 0, width: "140px" }}
                variant="contained" onClick={() => setOpen(true)}>
                Открыть
            </Button>
        </Grid>
    )
}


interface IExecuteDialogButtonsProps {
    executeDialogButtons: Array<IExecuteDialogButton>,
}

export const ExecuteDialogButtons = (props: IExecuteDialogButtonsProps) => {
    //const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    return (
        <Grid container direction="column" style={{ overflow: "hidden" }}>
            {
                props.executeDialogButtons.map(
                    (executeDialogButton, index) =>
                        <>
                            <ExecuteDialogButton
                                dialogProps={executeDialogButton.dialogProps}
                                title={executeDialogButton.title}
                                DialogComponent={executeDialogButton.DialogComponent} />

                            {index != (props.executeDialogButtons.length - 1) && <Divider />}
                        </>
                )
            }
        </Grid>
    )
}
