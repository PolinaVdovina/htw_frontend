import * as React from 'react';
import { AppBar } from './AppBar';
import { AppDrawer } from './AppDrawer';
import { AppMenuContext, IMenuContextValue } from './AppMenuContext';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

        menuButton: {
            marginRight: theme.spacing(2),
            display: "none",
            [theme.breakpoints.down('xs')]: {
                display: "block",
            }
        },

    }),
);

function mapStateToProps(state: RootState) {
    return {
        authorized: state.authReducer.loggedIn,
    }
}

interface IAppMenuProps {
    title?: String,
    leftAppartment?: any,
    rightAppartment?: any,
    /* authorized: boolean, */

}

export const AppMenu = (props: IAppMenuProps) => {
    const classes = useStyles();

    const contextValue: IMenuContextValue = {
        title: props.title,
    };

    return (
        <div>
            <AppMenuContext.Provider value={contextValue}>
                <AppBar
                    leftAppartment={props.leftAppartment}
                    rightAppartment={props.rightAppartment}
                />
            </AppMenuContext.Provider>
        </div>
    )
}

