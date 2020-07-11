import * as React from 'react';
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core';
import { RegRoleCard } from '../../components/cards/SignInCard/RegRoleCard';

interface IHomeProps {
    
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      alignItems: "center",
      alignContent:"center",
    },
  }),
);

export const Home = (props : IHomeProps) => {
    const classes = useStyles();
    return (
        <Grid container direction="row" className={classes.root}>
            <RegRoleCard title="Соискатель" desc="Хотите найти востребованную работу?" buttonText="Присоединиться"/>
            <RegRoleCard title="Образовательное учреждение" desc="Вам нужно организовать студенческие практики?" buttonText="Присоединиться"/>
            <RegRoleCard title="Работодатель" desc="Нуждаетесь в хорошем кадровом обеспечении?" buttonText="Присоединиться"/>
        </Grid>
    )
}