import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { RegRoleCard } from '../../components/cards/RegRoleCard';
import { HCenterizingGrid } from './../grid-containers/HCenterizingGrid';
import { RedirectIfNotAuthorized } from './../../components/redirects/RedirectIfNotAuthorized';

interface IHomeProps {
    
}

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {

//     },
//   }),
// );

export const Home = (props : IHomeProps) => {
    //const classes = useStyles();
    return (
        <HCenterizingGrid>
            <RegRoleCard title="Соискатель" desc="Хотите найти востребованную работу?" buttonText="Присоединиться"/>
            <RegRoleCard title="Образовательное учреждение" desc="Вам нужно организовать студенческие практики?" buttonText="Присоединиться"/>
            <RegRoleCard title="Работодатель" desc="Нуждаетесь в хорошем кадровом обеспечении?" buttonText="Присоединиться"/>
        </HCenterizingGrid>
    )
}