import * as React from "react"
import GetAppIcon from '@material-ui/icons/GetApp';
import { IconButton } from "@material-ui/core";

interface IRightDownloadButton {
    id: any
}

export const RightDownloadButton = (props: IRightDownloadButton) => {
    return (
        <IconButton
            onClick={() => alert(id)}
        >
            <GetAppIcon/>
        </IconButton>
    )
}