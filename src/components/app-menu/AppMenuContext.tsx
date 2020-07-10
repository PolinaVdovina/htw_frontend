import React from 'react'

export interface IMenuContextValue {
    title?: String
}

export const AppMenuContext = React.createContext<IMenuContextValue | null>(null);