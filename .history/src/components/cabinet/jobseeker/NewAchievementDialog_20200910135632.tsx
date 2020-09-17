import React from "react";
import { Dialog, DialogTitle, DialogContent, Grid, Typography, TextField, makeStyles, Theme, createStyles, useTheme } from "@material-ui/core";
import classes from "*.module.css";

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
                <Grid container direction="column" className={classes.root}>
                    <Grid item container direction="column" className={classes.fieldGrid}>
                        <Typography className={classes.fieldTitle}>Должность</Typography>
                        <TextField
                        fullWidth
                        variant="outlined"
                        //value={position}
                        //onChange={(event) => setPosition(event.target.value) }
                        size="small"/>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}