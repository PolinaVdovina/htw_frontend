import * as React from 'react';
import { AppBar } from './AppBar';
import { AppDrawer } from './AppDrawer';
import { AppMenuContext, IMenuContextValue } from './AppMenuContext';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';




interface IAppMenuProps {
    title?: String,
}

function mapStateToProps(state : RootState) {
    return {
      authorized: state.authReducer.loggedIn,
    }
}
  

export const AppMenu = (props : IAppMenuProps) => {
    const [isDrawerOpen, setDrawerOpen] = React.useState(false);

    const showDrawer = () => {
        setDrawerOpen(true);
    }

    const closeDrawer = () => {
        setDrawerOpen(false);
    }
    
    const contextValue: IMenuContextValue = {
        title: props.title,
    };

    return (
        <div>
            <AppMenuContext.Provider value={ contextValue }>
                <AppBar onDrawerShow={showDrawer}/>
                <AppDrawer onClose={closeDrawer} open={isDrawerOpen}/>
            </AppMenuContext.Provider>
        </div>
    )
}

