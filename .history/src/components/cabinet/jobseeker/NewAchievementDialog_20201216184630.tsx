import React from "react";
import { Dialog, DialogTitle, DialogContent, Grid, Typography, TextField, makeStyles, Theme, createStyles, useTheme, IconButton, Button, List, ListItem } from "@material-ui/core";
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

export const NewAchievementDialog = (props: INewAchievementDialog) => {
    const classes = useStyles();
    const theme = useTheme();
    const snackbar = useSnackbar();
    const dispatch = useDispatch();
    const openFileDialogRef: any = React.useRef();
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [files, setFiles] = React.useState(new Array<File>());

    const handleClickSave = async () => {
        let data = {
            title,
            description: description.replace("#", "%23")
        }

        if(props.token) {
            await dispatch(startLoadingAction())
            let fileList = await resizeList(files, 1280);
            const addedAchiev = await addAchievementFetch( props.token, data, fileList );
            if(addedAchiev.msgInfo.msgStatus == MessageStatus.OK) {
                snackbar.enqueueSnackbar("Достижение добавлено", {variant:'success'});  
                props.onSubmitSuccess();
                handleClickClose();
            }
            else {
                snackbar.enqueueSnackbar("Не удалось добавить достижение", {variant:'error'});  
            }
            await dispatch(stopLoadingAction())
        }        
    }

    const addImageHandler = async (e) => {
        let arrayFiles: Array<File> = [...files];
        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files.item(i);
            if (file !== null) {
                if (file.type != 'image/jpeg') {
                    snackbar.enqueueSnackbar("Файл с именем " + file.name + " имеет неподходящий тип. Пожалуйста, добавляйте только картинки расширения .jpeg/.jpg", {variant:'error'})
                }
                else
                    arrayFiles.push(file);
            }
                
        }
        setFiles(arrayFiles);
    }

    const handleClickClose = () => {
        setTitle("");
        setDescription("");
        setFiles(new Array<File>());
        props.onClose()
    }

    return(
        <Dialog open={props.open} onClose={handleClickClose}>
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
                        <Typography className={classes.fieldTitle}>Добавить файлы (изображения)</Typography>
                        <List>
                            {files.map(file => 
                                <ListItem style={{wordBreak: 'break-all'}}>{file.name}</ListItem>
                            )}
                        </List>                        
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
                            onClick={handleClickClose}
                        >
                            Выйти
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}