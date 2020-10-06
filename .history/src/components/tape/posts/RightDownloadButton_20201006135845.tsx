import * as React from "react"
import GetAppIcon from '@material-ui/icons/GetApp';
import { IconButton } from "@material-ui/core";

interface IRightDownloadButton {

}

export const RightDownloadButton = (props: IRightDownloadButton) => {
    return (
        <IconButton><GetAppIcon/></IconButton>
    )
}