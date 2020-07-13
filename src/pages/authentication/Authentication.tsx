import * as React from 'react';
import { SignInCard } from '../../components/auth-reg/SignInCard';

interface IAuthenticationProps {
    
}

export const Authentication = (props : IAuthenticationProps) => {
    return <div><SignInCard/></div>
}