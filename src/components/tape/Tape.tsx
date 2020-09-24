import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, Paper, useTheme, Divider } from '@material-ui/core';
import * as React from 'react';
import { Redirect } from 'react-router';
import { ITapeElementData, TapeElement, ITapeElementProps } from './posts/TapeElement';
import { CabinetContext } from './../cabinet/cabinet-context';

export interface ITapeProps {
  elements?: Array<ITapeElementData> | null,
  onDeleteClick?: ((id: any) => void) | null,
  isRespondActive?: boolean,
  isRespondViewActive?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    centerizedText: {
      textAlign: "center",
      padding: theme.spacing(2),
    },
  }),
);

export const Tape = (props: ITapeProps) => {
  const classes = useStyles();
  const theme = useTheme();


  return (
    <Grid container direction="column">
      <>
      {
        props.elements && props.elements.map((postData, index) =>
          <><TapeElement 
              isRespondViewActive={props.isRespondViewActive ? props.isRespondViewActive : false} 
              isRespondsActive={props.isRespondActive ? props.isRespondActive : false} 
              onDeleteClick={props.onDeleteClick} 
              key={postData.id} 
              tapeElementData={postData} 
              style={{ padding: theme.spacing(2) }} 
          /> <Divider key={"b" + index} /> </>
        )
      }
      {(!props.elements || props.elements.length == 0) &&
        <Typography className = {classes.centerizedText}>
          Пусто
        </Typography>
      }
      </>
    </Grid>
  )
}