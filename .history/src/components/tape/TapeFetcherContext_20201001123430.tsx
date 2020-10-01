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
        dataFetchFunction?: null | ((lastPostDate: string, dataCount) => any),
        sortingKey?: string
    ) => any,
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
        return null;
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