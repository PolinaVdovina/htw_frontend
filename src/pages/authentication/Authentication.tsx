import * as React from 'react';
import { SignInCard } from '../../components/auth-reg/SignInCard';
import { VHCenterizingGrid } from './../grid-containers/VHCenterizingGrid';
import { RedirectIfAuthorized } from './../../components/redirects/RedirectIfAuthorized';
import { Tape } from '../../components/cards/tape/Tape';

interface IAuthenticationProps {
    
}

export const Authentication = (props : IAuthenticationProps) => {
    return (
        <VHCenterizingGrid>
            <RedirectIfAuthorized/>
            <SignInCard/>
            
        </VHCenterizingGrid>
        )
}