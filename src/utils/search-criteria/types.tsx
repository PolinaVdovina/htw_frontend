import { IMessageInfo } from "../fetchInterfaces";

export enum SearchCriteriaOperation {
    EQUAL = "EQUAL", LIKE = "LIKE", MORE = "MORE", LESS = "LESS", EQUAL_MORE = "EQUAL_MORE", EQUAL_LESS = "EQUAL_LESS", NOT_EQUAL = "NOT_EQUAL", IN = "IN"
}

export enum SortCriteriaDirection {
    ASC="ASC", DESC="DESC"
}

export interface ISearchCriteria {
    fieldName: string,
    value: number | string | boolean,
    operation?: SearchCriteriaOperation,
}

export interface ISortCriteria {
    fieldName: string,
    sortDirection: SortCriteriaDirection,
}

export interface IPagination {
    pageNumber?: number,
    pageSize: number
}

export interface ISearchCriteriaRequest {
    searchCriteria?: Array<ISearchCriteria>,
    sortCriteria?: Array<ISortCriteria>,
    pagination?: IPagination,
}



