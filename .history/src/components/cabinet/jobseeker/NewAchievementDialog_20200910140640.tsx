import React from "react";
import { Dialog, DialogTitle, DialogContent, Grid, Typography, TextField, makeStyles, Theme, createStyles, useTheme, IconButton } from "@material-ui/core";
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
            padding:theme.spacing(2),
        },
        fieldGrid: {
            marginBottom: theme.spacing(2),
        },
        fieldTitle: {
            marginRight: theme.spacing(1),
            minWidth: "120px",
        },
        addButton: {
            justifySelf: "center",
            
        },
        plus: {
            width: '50px',
            height: '50px'
        }
    }),
);

export const NewAchievementDialog = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return(
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Добавление достижения</DialogTitle>
            <DialogContent>
                <Grid container direction="column" /*className={classes.root}*/>
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
                        //value={position}
                        //onChange={(event) => setPosition(event.target.value) }
                        size="small"/>
                    </Grid>
                    <Grid item container direction="column" className={classes.fieldGrid}>                        
                            <Typography className={classes.fieldTitle}>Добавить файлы</Typography>
                            <IconButton className={classes.addButton}>
                                <AddIcon className={classes.plus}/>
                            </IconButton>                        
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}