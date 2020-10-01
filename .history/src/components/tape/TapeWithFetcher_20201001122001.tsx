import { TapeFetcher } from "./TapeFetcher_OLD"
import { Tape } from "./Tape"
import * as React from 'react';
import { TapeFetcherProvider, TapeFetcherContext} from './TapeFetcherContext';
import { useContext } from 'react';
import { Grid, Button } from "@material-ui/core";
import { ITapeElementData } from "./posts/TapeElement";
import { searchCriteriaFetch } from "../../utils/fetchFunctions";
import { connect } from 'react-redux';
import { RootState } from "../../redux/store";
import { pagination, sortCriteria, searchCriteria } from './../../utils/search-criteria/builders';
import { ISearchCriteriaRequest, SortCriteriaDirection, SearchCriteriaOperation, ISearchCriteria } from "../../utils/search-criteria/types";

interface ITapeWithFetcherProps {
    dataConverterFunction?: (fetchedEntity) => ITapeElementData,
    url: string,
    token?: string | null,
    additionalSearchCriteria?: Array<ISearchCriteria> | null
    sortKey?: string | null,
    sessionUID?: any,
    isRespondActive: boolean,
    isActiveNeed?: boolean
}

export const TapeWithFetcherComp = (props: ITapeWithFetcherProps) => {
    return (
        <TapeFetcherProvider dataConverterFunction={props.dataConverterFunction}>
            <TapeWithFetcherWraper {...props} />
        </TapeFetcherProvider>
    )
}
// Grid container direction="column"
const TapeWithFetcherWraper = (props: ITapeWithFetcherProps) => {
    const context = useContext(TapeFetcherContext);
    const [isTapeOver, setTapeOver] = React.useState(false);
    const getNextElements = async () => {
        if (props.token) {
            const token = props.token;
            const searchCritActive = props.isActiveNeed ? [searchCriteria("active", true, SearchCriteriaOperation.EQUAL)] : []

            const fetchFunc = (lastPostDate: string, count) => {
                const requestData: ISearchCriteriaRequest = {
                    searchCriteria: [
                        (props.sortKey && props.sortKey == 'title') ? 
                        searchCriteria("customers", true, SearchCriteriaOperation.EQUAL) : 
                        searchCriteria("createdDate", lastPostDate, SearchCriteriaOperation.LESS),
                        ...searchCritActive
                    ],
                    sortCriteria: [
                        (props.sortKey && props.sortKey == 'title') ? 
                        sortCriteria("viewName", SortCriteriaDirection.ASC) : 
                        sortCriteria("createdDate", SortCriteriaDirection.DESC)
                    ],
                    pagination: pagination(5)
                }
                if (props.additionalSearchCriteria && requestData.searchCriteria)
                    requestData.searchCriteria = [...requestData.searchCriteria, ...props.additionalSearchCriteria];
                return searchCriteriaFetch<any>(props.url, token, requestData);
            }
            //const newElements = await context?.fetchNext(fetchFunc, props.sortKey ? props.sortKey : undefined);
       
            if(newElements && newElements.result && newElements.result.length < 5) 
                setTapeOver(true);
        }
    }

    React.useEffect(() => {
        if (props.token) {
            context?.reset();
            getNextElements();
        }
        //alert("jjj")
        //alert(JSON.stringify(props.additionalSearchCriteria))
    }, [props.token, props.additionalSearchCriteria])

    return (
        <Grid item container direction="column" style={{ flexGrow: 1 }}>
            <Grid item style={{ flexGrow: 1 }}>
                <Tape 
                    elements={context?.tapeElements} 
                    isRespondActive={props.isRespondActive}
                />
            </Grid>
            <Button
                variant="contained"
                disabled={isTapeOver}
                onClick={getNextElements}
                color="primary"
                fullWidth
                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                {isTapeOver ? "Лента закончена" : "Дальше"}
            </Button>
        </Grid>
    )
}

export const TapeWithFetcher = connect(
    (state: RootState) => ({
        token: state.authReducer.token
    })
)(TapeWithFetcherComp);