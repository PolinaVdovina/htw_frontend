import * as React from 'react';
import { Grid } from '@material-ui/core';
import { SignInCard } from '../../components/cards/SignInCard/SignInCard';

interface IHomeProps {
    
}

export const Home = (props : IHomeProps) => {
    return (
        <Grid direction="row">
            <SignInCard title="Соискатель"/>
        </Grid>
    )
}