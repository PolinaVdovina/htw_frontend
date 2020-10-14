import * as React from "react"
import GetAppIcon from '@material-ui/icons/GetApp';
import { IconButton, Link } from "@material-ui/core";
import { connect } from 'react-redux';
import { RootState } from "../../../redux/store";
import { saveDocResumeFetch } from "../../../utils/fetchFunctions";
import { MessageStatus } from "../../../utils/fetchInterfaces";

interface IRightDownloadButton {
    id: any,
    token: any
}

export const RightDownloadButtonComp = (props: IRightDownloadButton) => {
    const [ref, setRef] = React.useState(React.createRef<HTMLAnchorElement>());
    const rootUrl = "/api";

    const handleClick = async () => {
        let newRef: any = ref
        newRef.current.href = rootUrl + "/personal/resume/getfile/" + props.id
        newRef.current.download = "resume.docx"
        newRef.current.click()
    }

    return (
        <IconButton
            onClick={handleClick}
        >
            <a style={{display: "none"}} href="" ref={ref}>ref</a>
            <GetAppIcon/>
        </IconButton>
    )
}

export const RightDownloadButton = connect((state: RootState) => ({
    token: state.authReducer.token
  }))(RightDownloadButtonComp);