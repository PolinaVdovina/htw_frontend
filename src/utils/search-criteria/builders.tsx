import { SearchCriteriaOperation, ISearchCriteria, ISortCriteria, SortCriteriaDirection, IPagination } from "./types";


export const searchCriteria: (fieldName: string, value: any, operation?: SearchCriteriaOperation) => ISearchCriteria =
    (fieldName, value, operation) => {
        return {
            fieldName,
            value,
            operation
        }
    }

export const sortCriteria: (fieldName: string, sortDirection: SortCriteriaDirection) => ISortCriteria =
    (fieldName, sortDirection) => {
        return {
            fieldName,
            sortDirection
        }
    }

export const pagination: (pageSize: number, pageNumber?) => IPagination =
    (pageSize, pageNumber) => {
        return {
            pageSize,
            pageNumber
        }
    }