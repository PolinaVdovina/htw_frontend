import * as React from 'react';
import { AppBar } from './AppBar';
import { AppDrawer } from './AppDrawer';
import { MenuContext, IMenuContextValue } from './AppMenuContext';

interface IAppMenuProps {
    title?: String,
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
            <MenuContext.Provider value={ contextValue }>
                <AppBar onDrawerShow={showDrawer}/>
                <AppDrawer onClose={closeDrawer} open={isDrawerOpen}/>
            </MenuContext.Provider>
        </div>
    )
}