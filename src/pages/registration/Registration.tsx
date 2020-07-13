import * as React from 'react';
import { RegCard } from '../../components/auth-reg/RegCard';
import { VHCenterizingGrid } from './../grid-containers/VHCenterizingGrid';

interface IRegistrationProps {
    
}

export const Registration = (props : IRegistrationProps) => {
    return <VHCenterizingGrid><RegCard/></VHCenterizingGrid>
}