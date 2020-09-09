import * as React from 'react';
import { Dialog, useTheme } from '@material-ui/core';
import { AppBar } from './../app-menu/AppBar';
import { AppMenu } from '../app-menu/AppMenu';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridVerticalContainer: {
            width: "100%",

            
            alignItems: "center",
            backgroundColor: "#edeef0",

        },
        content: {
            flexGrow: 1,
            maxWidth: theme.container.maxWidth,
/*             paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
            [theme.breakpoints.down('xs')]: {
                paddingLeft: theme.spacing(0),
                paddingRight: theme.spacing(0),
              }, */
            flexWrap: "nowrap",
            alignContent: "center",
            //padding: theme.spacing(2),
        },
        fakeMenuBar: {
            height: theme.menuBar.height
        },
        backdrop: {
            zIndex: 10000000,
        },
        appMenuPaper: {
            marginRight: theme.spacing(2),
            height: "min-content",
            overflow: "hidden",
            width: theme.menuBar.menuWidth,
            minWidth: theme.menuBar.menuWidth,
            [theme.breakpoints.down('xs')]: {
                display: "none",
            },
            //position: "fixed",
        },
        fakeAppMenuPaper: {
            position: "absolute",
            marginRight: theme.spacing(2),
            height: "min-content",
            overflow: "hidden",
            width: theme.menuBar.menuWidth,
            flexGrow: 1,
            [theme.breakpoints.down('xs')]: {
                display: "none",
            }
        },
        menuButton: {
            marginRight: theme.spacing(2),
            display: "none",
            [theme.breakpoints.down('xs')]: {
                display: "block",
            }
        },
    }),
);

export interface IDialogWithAppBarProps {
    onClose?: () => any,
    open: boolean,
    children?: any,
    fullScreen?: boolean,
    title?: string,
    paperStyle?: React.CSSProperties
}


export const DialogWithAppBar = (props: IDialogWithAppBarProps) => {
    const theme = useTheme();
    const classes = useStyles();
    return (
        <Dialog
            scroll="body"
            PaperProps={{
                style: props.paperStyle
            }}
            fullWidth={props.fullScreen}
            open={props.open}
        >
            <Grid className={classes.gridVerticalContainer} container direction="column" >
                {/* <Grid item style={{ height: theme.menuBar.height }} /> */}
                <Grid className={classes.content} container item direction="row" >
       
                    {props.children}
                </Grid>

            </Grid>


        </Dialog>)
}