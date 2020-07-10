import * as React from 'react';
import { Drawer } from "@material-ui/core"

interface IAppDrawerProps {
    open?: boolean,
    onClose?: (event) => void
}

export const AppDrawer = (props: IAppDrawerProps) => {
    return (
        <Drawer open={props.open} onClose={props.onClose}>
            ПРИВЕЕЕЕЕТ  УААААА
        </Drawer>
    )
}