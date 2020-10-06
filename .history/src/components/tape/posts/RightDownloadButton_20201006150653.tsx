import * as React from "react"
import GetAppIcon from '@material-ui/icons/GetApp';
import { IconButton } from "@material-ui/core";
import { connect } from 'react-redux';
import { RootState } from "../../../redux/store";
import { saveDocResumeFetch } from "../../../utils/fetchFunctions";
import { MessageStatus } from "../../../utils/fetchInterfaces";

interface IRightDownloadButton {
    id: any,
    token: any
}

export const RightDownloadButtonComp = (props: IRightDownloadButton) => {
    const [ref, setRef] = React.useState(React.createRef());

    const handleClick = async () => {
        const resultFetch: any = await saveDocResumeFetch(props.token, props.id);
        if (resultFetch.msgStatus == MessageStatus.OK) {
            FileSaver.saveAs(resultFetch.result, "resume.docx");
        }
    }

    return (
        <IconButton
            onClick={handleClick}
        >
            <a style={{display: 'none'}} href={"" + props.id} target="_blank" >qwe</a>
            <GetAppIcon/>
        </IconButton>
    )
}

export const RightDownloadButton = connect((state: RootState) => ({
    token: state.authReducer.token
  }))(RightDownloadButtonComp);