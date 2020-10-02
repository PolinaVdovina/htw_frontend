import { Typography } from "@material-ui/core";
import * as React from "react"
import { TapeFetcherContext } from "../../components/tape/TapeFetcherContext";
import { getCountOfSearch, searchCriteriaFetch } from "../../utils/fetchFunctions";
import { searchCriteria, sortCriteria } from "../../utils/search-criteria/builders";
import { SearchCriteriaOperation, ISearchCriteriaRequest, SortCriteriaDirection, ISearchCriteria } from "../../utils/search-criteria/types";

interface ITitleWithCount {
    entityType: string,
    token: any,
    additionalSearchCriteria: Array<ISearchCriteria> | null
}

const urls = {
    jobseeker: "/personal/getBySearchCriteria",
    vacancy: "/vacancy/getBySearchCriteria",
    employer: "/employer/getBySearchCriteria",
    institution: "/institution/getBySearchCriteria"
}

const titles = {
    jobseeker: "Соискатели",
    vacancy: "Вакансии",
    employer: "Работодатели",
    institution: "Образовательные учреждения"
}

export const TitleWithCount = (props: ITitleWithCount) => {
    const title = titles[props.entityType];
    const context = React.useContext(TapeFetcherContext);
    const [countElems, setCountElems] = React.useState({
        jobseeker: 0,
        vacancy: 0,
        employer: 0,
        institution: 0
    })

    const getCount = async () => {
        if (props.token) {
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
            alert(JSON.stringify(resultFetch.result))
            //setCountElems[props.entityType](resultFetch.result.length)
            
             
            //return searchCriteriaFetch<any>(urls[props.entityType], token, requestData);            
            //const newElements: any = await getCountOfSearch(fetchFunc);
            //setCountElems[props.entityType](newElements.length)
        }
    }

    React.useEffect(() => {
        getCount()
    })

    return(
        <Typography variant="h6" style={{ flexGrow: 1, width: "min-content" }}>
            {title + " (Результатов: " + countElems[props.entityType] + ")"}
        </Typography>
    )
}