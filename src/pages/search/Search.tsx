import * as React from 'react';
import { RegCard } from '../../components/auth-reg/RegCard';
import { VHCenterizingGrid } from './../grid-containers/VHCenterizingGrid';
import { RedirectIfAuthorized } from './../../components/redirects/RedirectIfAuthorized';
import { HCenterizingGrid } from './../grid-containers/HCenterizingGrid';

interface ISearch {
    
}

export const Search = (props : ISearch) => {
    return (
        <HCenterizingGrid>
            <div></div>
        </HCenterizingGrid>
    )
}