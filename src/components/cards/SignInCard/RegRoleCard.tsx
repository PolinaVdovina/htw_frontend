import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, Divider } from '@material-ui/core';
import * as React from 'react';

interface IRegRoleCardProps {
    title?: String,
    desc?: String,
    buttonText?: String,
    path?: String,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
        maxWidth: "400px",
        width: "300px",
        height: "180px",
        padding: "15px",
        overflowY: "auto",
    },

    maxGrow: {
        flexGrow: 1,
    },

    root: {
      padding: "15px"
    },

    title: {
        textAlign: "center",
        marginBottom: "15px"
    },

    gridContainer: {
        height: "100%",
    }
  }),
);

export const RegRoleCard = (props: IRegRoleCardProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Grid className={classes.gridContainer} container direction="column">
                    <Grid item>
                        <Typography variant="h5" className={classes.title}>
                            {props.title}
                        </Typography>

                    </Grid>
                    <Grid item className={classes.maxGrow}>
                        <Typography>
                            {props.desc}
                        </Typography>
                    </Grid>
                    {
                    props.buttonText  && 
                    <Grid item>
                        <Button fullWidth variant="contained" color="primary">
                            {props.buttonText}
                        </Button>
                    </Grid>
                    }
                </Grid>
            </Card>
        </div>
    )
}