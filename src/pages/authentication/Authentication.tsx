import * as React from 'react';
import { SignInCard } from '../../components/auth-reg/SignInCard';
import { VHCenterizingGrid } from './../grid-containers/VHCenterizingGrid';

interface IAuthenticationProps {
    
}

export const Authentication = (props : IAuthenticationProps) => {
    return <VHCenterizingGrid><SignInCard/></VHCenterizingGrid>
}