

import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, Paper, useTheme, Divider } from '@material-ui/core';
import * as React from 'react';
import { Redirect } from 'react-router';
import { ITapeElementData, TapeElement, ITapeElementProps } from './posts/TapeElement';
import { CabinetContext } from '../cabinet/cabinet-context';
import { Tape, ITapeProps } from './Tape';
import { useDispatch, connect } from 'react-redux';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';
import { RootState } from '../../redux/store';
import { ITapeFetch } from '../../utils/fetchFunctions';
import { MessageStatus } from '../../utils/fetchInterfaces';
import { TapeFetcherContext } from './TapeFetcherContext';

interface ITapeFetcherProps extends ITapeProps {
    dataFetchFunction?: ((lastPostDate: string, dataCount) => Promise<ITapeFetch>) | null,
    fetchCount?: number
    dataConverterFunction?: (fetchedEntity) => ITapeElementData,
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      
    },
  }),
);

export const TapeFetcherComp = (props: ITapeFetcherProps) => {
    const classes = useStyles();
    const tapeProps: ITapeProps = props;
    const theme = useTheme();

    const fetchCount = props.fetchCount ? props.fetchCount : 3;

    const dispatch = useDispatch();
    const context = React.useContext(TapeFetcherContext);
    const getTapeElements = async() => {
        if(props.dataFetchFunction && context)  {
            dispatch( startLoadingAction );
            //Если элементов нет (не было фетча) - беру текущую дату, иначе беру дату последнего поста на ленте
            let minDateForFilter;
            if(context.tapeElements && context.tapeElements.length > 0) 
                minDateForFilter = context.tapeElements[context.tapeElements.length-1].createdDate;
            else 
                minDateForFilter = new Date(Date.now()).toUTCString();
            
            
            const fetchResult = await props.dataFetchFunction(minDateForFilter, fetchCount);
            if((fetchResult.msgInfo.msgStatus == MessageStatus.OK)&&(fetchResult.tapeElements)) {
                if(props.dataConverterFunction) {
                    const newTapeElements = fetchResult.tapeElements.map(props.dataConverterFunction);
                    if(!context.tapeElements)
                        context.setTapeElements(newTapeElements);
                    else
                        context.setTapeElements([...context.tapeElements, ...newTapeElements]);
                }
                else {
                    context.setTapeElements(fetchResult.tapeElements);
                    
                }
            }
            dispatch( stopLoadingAction );

        }
    }

    React.useEffect(() => {
        getTapeElements();
    }, [])
    //alert(JSON.stringify(tapeElements));
    return (
        <Grid container direction="column">
            <Grid item>
                <Tape {...tapeProps} elements={context && context.tapeElements}/>
            </Grid>
            <Grid item style = {{flexGrow:1}}>
                <Button variant="contained" color="primary" fullWidth onClick={getTapeElements} style={{borderTopLeftRadius: 0, borderTopRightRadius:0}}>Дальше</Button>
            </Grid>
        </Grid>
    )
}

export const TapeFetcher = connect(
    (state: RootState) => ({
        token: state.authReducer.token
    })
)(TapeFetcherComp)