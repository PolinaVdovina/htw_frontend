import React from 'react'
import { ITapeElementData } from './posts/TapeElement';
import { ITapeFetch, ISearchCriteriaResponse } from '../../utils/fetchFunctions';
import { useDispatch } from 'react-redux';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';
import { MessageStatus } from '../../utils/fetchInterfaces';
import { sortCriteria } from '../../utils/search-criteria/builders';

export interface ITapeContextValue {
    //dataFetchFunction?: ((lastPostDate: string, dataCount) => Promise<ITapeFetch>) | null,
    //fetchCount?: number
    //dataConverterFunction?: (fetchedEntity) => ITapeElementData,
    tapeElements: Array<ITapeElementData> | null,
    setTapeElements: any// (newElements: Array<ITapeElementData>) => void,
    changeTapeElement?: (id: number, newValue: ITapeElementData) => void
    fetchNext: (
        dataFetchFunction?: null | ((lastPostDate: string, dataCount) => Promise<ISearchCriteriaResponse<any>>),
        sortingKey?: string
    ) => Promise<ISearchCriteriaResponse<any>>,
    reset: () => void,
    deleteTapeElement: (id) => void
    addTapeElementAtFirst: (data: ITapeElementData) => void
}

export const TapeFetcherContext = React.createContext<ITapeContextValue | null>(null);

export interface ITapeFetcherProvider {
    fetchCount?: number,
    children: any,
    dataConverterFunction?: (fetchedEntity) => ITapeElementData,
}

export const TapeFetcherProvider = (props: ITapeFetcherProvider) => {
    let [tapeElements, setTapeElements] = React.useState<Array<ITapeElementData> | null>(null);
    const fetchCount = props.fetchCount ? props.fetchCount : 5;
    const dispatch = useDispatch();



    

    const setTapeElementsHandler = setTapeElements;
    const resetHandler = () => {tapeElements = null; setTapeElements(null)};


    const deleteTapeElementHandler = (id) => {
        if (tapeElements)
            setTapeElements(tapeElements.filter(el => el.id != id));
    }

    const addTapeElementAtFirstHandler = (data) => {
        if (tapeElements) {
            if (props.dataConverterFunction)
                setTapeElements([props.dataConverterFunction(data), ...(tapeElements ? tapeElements : [])]);
            else
                setTapeElements([data, ...(tapeElements ? tapeElements : [])]);
        }
    }

    const fetchNextHandler = async (dataFetchFunction, keyForFindingLastElement? ) => {
        const sortingKey = keyForFindingLastElement ? keyForFindingLastElement : "createdDate"
        if (dataFetchFunction) {
            dispatch(startLoadingAction());
            //Если элементов нет (не было фетча) - беру текущую дату, иначе беру дату последнего поста на ленте
            let minDateForFilter: string | null = null;
            if (tapeElements && tapeElements.length > 0) {
                minDateForFilter = tapeElements[tapeElements.length - 1][sortingKey];
            }
            else {
                if(sortingKey == "createdDate")
                    minDateForFilter = new Date(Date.now()).toISOString();
            }
            const fetchResult = await dataFetchFunction(minDateForFilter, fetchCount);
            if ((fetchResult.msgInfo.msgStatus == MessageStatus.OK) && (fetchResult.result)) {
                if (props.dataConverterFunction) {
                    const newTapeElements = fetchResult.result.map(props.dataConverterFunction);
                    if (!tapeElements)
                        setTapeElements(newTapeElements);
                    else
                        setTapeElements((oldElements: any) => [...oldElements, ...newTapeElements]);
                }
                else {
                    setTapeElements(fetchResult.tapeElements);
                }
            }
             dispatch(stopLoadingAction());
            return fetchResult;
        }
    }

    return (
        <TapeFetcherContext.Provider value={{
            addTapeElementAtFirst: addTapeElementAtFirstHandler,
            deleteTapeElement: deleteTapeElementHandler,
            tapeElements: tapeElements,
            fetchNext: fetchNextHandler,
            //fetchCount,
            setTapeElements: setTapeElementsHandler,
            reset: resetHandler
        }}>
            {props.children}
        </TapeFetcherContext.Provider>
    )
}