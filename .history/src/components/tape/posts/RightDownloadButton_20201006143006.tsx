import * as React from "react"
import GetAppIcon from '@material-ui/icons/GetApp';
import { IconButton } from "@material-ui/core";

interface IRightDownloadButton {
    id: any
}

export const RightDownloadButton = (props: IRightDownloadButton) => {
    const [ref, setRef] = React.useState(React.createRef());

    const handleClick = async () => {

    }

    return (
        <IconButton
            onClick={handleClick}
        >
            <a style={{display: 'none'}} href={"/personal/resume/getfile/" + props.id} target="_blank" >qwe</a>
            <GetAppIcon/>
        </IconButton>
    )
}