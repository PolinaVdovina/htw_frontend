import { Typography } from "@material-ui/core";
import * as React from "react"
import { useDispatch } from "react-redux";
import { TapeFetcherContext } from "../../components/tape/TapeFetcherContext";
import { startLoadingAction, stopLoadingAction } from "../../redux/actions/dialog-actions";
import { getCountOfSearch, searchCriteriaFetch } from "../../utils/fetchFunctions";
import { searchCriteria, sortCriteria } from "../../utils/search-criteria/builders";
import { SearchCriteriaOperation, ISearchCriteriaRequest, SortCriteriaDirection, ISearchCriteria } from "../../utils/search-criteria/types";

interface ITitleWithCount {
    entityType: string,
    token: any,
    additionalSearchCriteria: Array<ISearchCriteria> | null
}

const urls = {
    jobseeker: "/personal/getBySearchCriteria/count",
    vacancy: "/vacancy/getBySearchCriteria/count",
    employer: "/employer/getBySearchCriteria/count",
    institution: "/institution/getBySearchCriteria/count"
}

const titles = {
    jobseeker: "Соискатели",
    vacancy: "Вакансии",
    employer: "Работодатели",
    institution: "Образовательные учреждения"
}

export const TitleWithCount = (props: ITitleWithCount) => {
    const title = titles[props.entityType];
    const dispatch = useDispatch();
    const [countElems, setCountElems] = React.useState(0)

    const getCount = async () => {
        if (props.token) {
            dispatch( startLoadingAction() )
            const token = props.token;          
            const lastPostDate: string = new Date(Date.now()).toISOString()
            const requestData: ISearchCriteriaRequest = {
                searchCriteria: [
                    searchCriteria("createdDate", lastPostDate, SearchCriteriaOperation.LESS),                            
                ],
                sortCriteria: [
                    sortCriteria("createdDate", SortCriteriaDirection.DESC)
                ]
            }
            if (props.additionalSearchCriteria && requestData.searchCriteria)
                requestData.searchCriteria = [...requestData.searchCriteria, ...props.additionalSearchCriteria];
            const resultFetch: any = getCountOfSearch(token, requestData, urls[props.entityType])
            setCountElems(resultFetch.result)
            dispatch ( stopLoadingAction() )
        }
    }

    React.useEffect(() => {
        getCount()
    }, [])

    return(
        <Typography variant="h6" style={{ flexGrow: 1, width: "min-content" }}>
            {title + " (Результатов: " + (countElems ? countElems : "0") + ")"}
        </Typography>
    )
}