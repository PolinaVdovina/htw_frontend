import React from 'react'

export interface IMenuContextValue {
    title?: String
}

export const MenuContext = React.createContext<IMenuContextValue | null>(null);