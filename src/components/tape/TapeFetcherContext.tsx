import React from 'react'
import { ITapeElementData } from './posts/TapeElement';
import { ITapeFetch } from '../../utils/fetchFunctions';
import { useDispatch } from 'react-redux';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';
import { MessageStatus } from '../../utils/fetchInterfaces';

export interface ITapeContextValue {
    //dataFetchFunction?: ((lastPostDate: string, dataCount) => Promise<ITapeFetch>) | null,
    //fetchCount?: number
    //dataConverterFunction?: (fetchedEntity) => ITapeElementData,
    tapeElements: Array<ITapeElementData> | null, 
    setTapeElements: (newElements: Array<ITapeElementData> ) => void,
    fetchNext: (
        dataFetchFunction?: ((lastPostDate: string, dataCount) => Promise<ITapeFetch>) | null,
        dataConverterFunction?: (fetchedEntity) => ITapeElementData
    ) => Promise<void>,
    reset: () => void
}

export const TapeFetcherContext = React.createContext<ITapeContextValue | null>(null);


interface ITapeFetcherProvider {
    dataFetchFunction?: ((lastPostDate: string, dataCount) => Promise<ITapeFetch>) | null,
    fetchCount?: number
    dataConverterFunction?: (fetchedEntity) => ITapeElementData, 
}

export const TapeFetcherProvider = (props) => {
    const [tapeElements, setTapeElements] = React.useState<Array<ITapeElementData> | null>(null);
    const fetchCount = props.fetchCount ? props.fetchCount : 5;
    const dispatch = useDispatch();

    const setTapeElementsHandler = (newElements: Array<ITapeElementData> ) => setTapeElements(newElements);
    const resetHandler = () => setTapeElements(null);
    const fetchNextHandler = async(dataFetchFunction, dataConverterFunction) => {
        if(dataFetchFunction)  {
            dispatch( startLoadingAction() );
            //Если элементов нет (не было фетча) - беру текущую дату, иначе беру дату последнего поста на ленте
            let minDateForFilter;
            if(tapeElements && tapeElements.length > 0) 
                minDateForFilter = tapeElements[tapeElements.length-1].createdDate;
            else 
                minDateForFilter = new Date(Date.now()).toUTCString();
            
            
            const fetchResult = await dataFetchFunction(minDateForFilter, fetchCount);
            
            if((fetchResult.msgInfo.msgStatus == MessageStatus.OK)&&(fetchResult.tapeElements)) {
                if(dataConverterFunction) {
                    const newTapeElements = fetchResult.tapeElements.map(dataConverterFunction);
                    if(!tapeElements)
                        setTapeElements(newTapeElements);
                    else
                        setTapeElements([...tapeElements, ...newTapeElements]);
                }
                else {
                    setTapeElements(fetchResult.tapeElements);
                    
                }
            }
            dispatch( stopLoadingAction() );

        }
    }

    return (
        <TapeFetcherContext.Provider value = {{
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