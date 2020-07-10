import * as React from 'react';
import { Grid } from '@material-ui/core';
import { RegRoleCard } from '../../components/cards/SignInCard/RegRoleCard';

interface IHomeProps {
    
}

export const Home = (props : IHomeProps) => {
    return (
        <Grid container direction="row" spacing={5}>
            <RegRoleCard title="Соискатель" desc="Ищите работу?" buttonText="Присоединиться"/>
            <RegRoleCard title="Образовательное учреждение"/>
            <RegRoleCard title="Работодатель"/>
        </Grid>
    )
}