import { IFilterFieldProps } from "../filter-fields/FilterField";
import { ISearchCriteria } from "../../../utils/search-criteria/types";

//export type types = "range" | "equal";


export interface ISearchSettingsElement {
    title: string,
    Component: (props: IFilterFieldProps) => JSX.Element,
    searchCriteriaConverter: (currentValue: any) => Array<ISearchCriteria> | null,
    collapse?: boolean
}

export type SearchSettingsType = Array<ISearchSettingsElement>