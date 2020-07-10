import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import * as React from 'react';

interface IRegRoleCardProps {
    title?: String,
    desc?: String,
    buttonText?: String,
    path?: String,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "400px",
      height: "250px"
    },
  }),
);

export const RegRoleCard = (props: IRegRoleCardProps) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Grid direction="column">
                <Grid item>
                    <Typography variant="h4">
                        {props.title}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography>
                        {props.desc}
                    </Typography>
                </Grid>
                <Grid item>
                    <Button>
                        {props.buttonText}
                    </Button>
                </Grid>
            </Grid>
        </Card>
    )
}