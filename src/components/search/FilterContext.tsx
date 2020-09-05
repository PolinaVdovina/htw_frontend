import { ISearchCriteria } from "../../utils/search-criteria/types";
import React from 'react';

export interface IFilterContextValue {
    searchCriteria: Array<ISearchCriteria> | null
    setSearchCriteria: (searchCriteria: Array<ISearchCriteria>) => void
}

export const FilterContext = React.createContext<IFilterContextValue | null>(null);

/* export const FilterDataProvider = (props) => {
    return <
} */