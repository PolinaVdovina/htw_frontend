import * as React from 'react';
import { SignInCard } from '../../components/auth-reg/SignInCard';
import { VHCenterizingGrid } from './../grid-containers/VHCenterizingGrid';
import { RedirectIfAuthorized } from './../../components/redirects/RedirectIfAuthorized';
import { Tape } from '../../components/tape/Tape';
import { PaddingPaper } from '../../components/cards/PaddingPaper';
import { Typography, useTheme, Grid } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';

export const AccountActivation = (props) => {
    const theme = useTheme();
    return (
        <VHCenterizingGrid>
            <PaddingPaper>
                <Grid container direction="column" style={{maxWidth: 500}}>
                    <Typography variant="h4" style={{marginBottom: theme.spacing(2)}}>
                        Активация учетной записи
                    </Typography>
                    <Typography style={{marginBottom: theme.spacing(5)}}>
                        На вашу электронную почту пришло сообщение с ссылкой для активации вашей учетной записи. Перейдите по этой ссылке, чтобы начать пользоваться системой HowToWork.
                    </Typography>
                    <Grid item style={{alignSelf: "flex-end"}}>
                        <EmailIcon color="primary"/>
                    </Grid>
                </Grid>
            </PaddingPaper>
        </VHCenterizingGrid>
        )
}