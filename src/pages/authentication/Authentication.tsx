import * as React from 'react';
import { SignInCard } from '../../components/auth-reg/SignInCard';
import { HCenterizingGrid } from '../grid-containers/HCenterizingGrid';
import { VHCenterizingGrid } from './../grid-containers/VHCenterizingGrid';

interface IAuthenticationProps {
    
}

export const Authentication = (props : IAuthenticationProps) => {
    return <VHCenterizingGrid><SignInCard/></VHCenterizingGrid>
}