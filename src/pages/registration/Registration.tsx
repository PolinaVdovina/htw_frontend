import * as React from 'react';
import { RegCard } from '../../components/auth-reg/RegCard';
import { VHCenterizingGrid } from './../grid-containers/VHCenterizingGrid';
import { RedirectIfAuthorized } from './../../components/redirects/RedirectIfAuthorized';

interface IRegistrationProps {
    
}

export const Registration = (props : IRegistrationProps) => {
    return (
        <VHCenterizingGrid>
            <RedirectIfAuthorized/>
            <RegCard/>
        </VHCenterizingGrid>
    )
}