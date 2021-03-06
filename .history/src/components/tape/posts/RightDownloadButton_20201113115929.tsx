import * as React from "react"
import GetAppIcon from '@material-ui/icons/GetApp';
import { Button, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, IconButton, Link, Radio, RadioGroup, useTheme } from "@material-ui/core";
import { connect } from 'react-redux';
import { RootState } from "../../../redux/store";
import { saveDocResumeFetch } from "../../../utils/fetchFunctions";
import { MessageStatus } from "../../../utils/fetchInterfaces";

const FileTypes = {
    WORD: "docx",
    PDF: "pdf"
}

interface IRightDownloadButton {
    id: any,
    token: any
}

export const RightDownloadButtonComp = (props: IRightDownloadButton) => {
    const [ref, setRef] = React.useState(React.createRef<HTMLAnchorElement>());
    const [openDialog, setOpenDialog] = React.useState(false);
    const [fileType, setFileType] = React.useState(FileTypes.WORD)
    const theme = useTheme();
    const rootUrl = "/api";

    const handleClick = async () => {
/*         let newRef: any = ref
        newRef.current.href = rootUrl + "/personal/resume/getfile/"+ fileType + "/" + props.id
        newRef.current.download = "resume." + fileType
        newRef.current.click() */
        setOpenDialog(false);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFileType((event.target as HTMLInputElement).value);
    };

    return (<>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>
                Выберите тип файла
            </DialogTitle>
            <DialogContent>
                <Grid container direction="column" alignItems="center">
                    <RadioGroup aria-label="gender" name="gender1" value={fileType} onChange={handleChange}>
                        <FormControlLabel value={FileTypes.WORD} control={<Radio />} label=".docx" />
                        <FormControlLabel value={FileTypes.PDF} control={<Radio />} label=".pdf" />
                    </RadioGroup>
                    <Grid item>
                        <Button 
                            variant="contained"
                            style={{'margin': theme.spacing(1), width:"60%"}}
                            color="primary"
                            href={rootUrl + "/personal/resume/getfile/"+ fileType + "/" + props.id}
                            download={"resume." + fileType}
                            onClick={handleClick}>
                            ОК
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
        <IconButton
            onClick={() => setOpenDialog(true)}
        >
            <a style={{display: "none"}} href="" ref={ref}>ref</a>
            <GetAppIcon/>
        </IconButton>
    </>)
}

export const RightDownloadButton = connect((state: RootState) => ({
    token: state.authReducer.token
  }))(RightDownloadButtonComp);