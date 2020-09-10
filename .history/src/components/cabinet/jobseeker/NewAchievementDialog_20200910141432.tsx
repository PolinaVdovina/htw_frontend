import React from "react";
import { Dialog, DialogTitle, DialogContent, Grid, Typography, TextField, makeStyles, Theme, createStyles, useTheme, IconButton, Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

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
            flexBasis: '500px'
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
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    return(
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Добавление достижения</DialogTitle>
            <DialogContent>
                <Grid container direction="column" className={classes.root}>
                    <Grid item container direction="column" className={classes.fieldGrid}>
                        <Typography className={classes.fieldTitle}>Название</Typography>
                        <TextField
                        fullWidth
                        variant="outlined"
                        //value={position}
                        //onChange={(event) => setPosition(event.target.value) }
                        size="small"/>
                    </Grid>
                    <Grid item container direction="column" className={classes.fieldGrid}>
                        <Typography className={classes.fieldTitle}>Описание</Typography>
                        <TextField
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={3}
                        //value={position}
                        //onChange={(event) => setPosition(event.target.value) }
                        size="small"/>
                    </Grid>
                    <Grid item container direction="column" className={classes.fieldGrid}>                        
                        <Typography className={classes.fieldTitle}>Добавить файлы</Typography>
                        <Grid item container justify="center">
                            <IconButton className={classes.addButton}>
                                <AddIcon/>
                            </IconButton> 
                        </Grid>                                                   
                    </Grid>
                    <Grid item container direction="row">
                        <Button 
                            variant="contained" 
                            color="primary"
                            //onClick={() => validateAndPackageFormData()}  
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