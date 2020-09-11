import React from "react";
import { Dialog, DialogTitle, DialogContent, Grid, Typography, TextField, makeStyles, Theme, createStyles, useTheme, IconButton, Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { useSnackbar } from "notistack";
import { startLoadingAction, stopLoadingAction } from "../../../redux/actions/dialog-actions";
import { MessageStatus } from "../../../utils/fetchInterfaces";
import { useDispatch } from "react-redux";
import { addAchievementFetch } from "../../../utils/fetchFunctions";
import { resizeList } from "../../../utils/appliedFunc";

interface INewAchievementDialog {
    token: string
    onClose: () => void
    onSubmitSuccess: () => void
    open: boolean
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            //padding:theme.spacing(2),
            //minWidth: '500px'
        },
        fieldGrid: {
            marginBottom: theme.spacing(2),
        },
        fieldTitle: {
            marginRight: theme.spacing(1),
            minWidth: "120px",
        },
        addButton: {
            width: '50px',
            height: '50px'
        },
    }),
);

export const NewAchievementDialog = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const snackbar = useSnackbar();
    const dispatch = useDispatch();
    const openFileDialogRef: any = React.useRef();
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [files, setFiles] = React.useState();

    const handleClickSave = async () => {
        let data = {
            title,
            description
        }

        if(props.token) {
            await dispatch(startLoadingAction())
            let fileList = resizeList(files, 500);
            alert(fileList);
            const addedAchiev = await addAchievementFetch( props.token, data, fileList );
            if(addedAchiev.msgInfo.msgStatus == MessageStatus.OK) {
                snackbar.enqueueSnackbar("Достижение добавлено", {variant:'success'});  
                props.onSubmitSuccess();
                props.onClose();
            }
            else {
                snackbar.enqueueSnackbar("Не удалось добавить достижение", {variant:'error'});  
            }
            await dispatch(stopLoadingAction())
        }        
    }

    const addImageHandler = async (e) => {
        setFiles(e.target.files);
    }

    return(
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Добавление достижения</DialogTitle>
            <DialogContent>
                <Grid container direction="column">
                    <Grid item container direction="column" className={classes.fieldGrid}>
                        <Typography className={classes.fieldTitle}>Название</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            size="small"
                        />
                    </Grid>
                    <Grid item container direction="column" className={classes.fieldGrid}>
                        <Typography className={classes.fieldTitle}>Описание</Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={3}
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            size="small"
                        />
                    </Grid>
                    <Grid item container direction="column" className={classes.fieldGrid}>                        
                        <Typography className={classes.fieldTitle}>Добавить файлы</Typography>
                        <Grid item container justify="center">
                            <input
                                ref={openFileDialogRef}
                                type='file'
                                onChange={addImageHandler}
                                style={{ display: "none" }}
                                multiple
                            />
                            <IconButton 
                                className={classes.addButton}
                                onClick={() => openFileDialogRef.current.click()}
                            >
                                <AddIcon/>
                            </IconButton> 
                        </Grid>                                                   
                    </Grid>
                    <Grid item container direction="row">
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={handleClickSave}  
                            style={{flexGrow:1, marginRight:theme.spacing(2)}}
                        >
                            Добавить
                        </Button>
                        <Button 
                            variant="contained" 
                            onClick={() => props.onClose && props.onClose()}
                        >
                            Выйти
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}