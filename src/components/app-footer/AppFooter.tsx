import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

interface IAppFooterProps {
    title?: String,
    onDrawerShow?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    height?: number,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        backgroundColor: theme.palette.primary.main,
        height: "128px",
        width: "100%"
    }
  }),
);

export const AppFooter = (props : IAppFooterProps) => {
    const classes = useStyles();
    return (
        <footer className = {classes.root}>

        </footer>
    )
}