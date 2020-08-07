import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, Paper, Avatar, Divider, IconButton, Collapse} from '@material-ui/core';
import * as React from 'react';
import { Redirect } from 'react-router';
import { PaddingPaper } from '../../cards/PaddingPaper';
import { BodyElementComp } from './post-body-elements/post-body-element';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useTheme } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export interface IBodyElement {
  data?: any,
  Component: BodyElementComp,
}

type SubButtonType = {
  IconComponent: any,
  key: string
}

export interface IPostData {
  id?: any,
  title?: string,
  body?: Array<IBodyElement>,
  fileList?: FileList,
  createdAt?: string,
  lastChange?: string,
  owner?: string,    
  shortDescription?: string,
}

export interface IPostProps {
  postData: IPostData,
  style: any,
  isOpenedDefaut?: boolean,
  onDeleteClick?: (postId: any ) => void,
  onChangeClick?: (postId: any ) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    aboutGrid: {
      alignItems: "center",
      flexWrap: "nowrap",
    },
    avatar: {
      marginRight: theme.spacing(1),
    },
    descriptionBlock: {
      fontSize:"12px", 
    },
    openBlock: {
      maxHeight: "2000px",
      overflow:"hidden",
      transition: "all 1s ease-out",
    },
    closedBlock: {
      maxHeight: "0px",
      overflow:"hidden",
      transition: "all 1s ease-out",
    },
    button: {
      width: "32px",
      height: "32px",
    }
  }),
);



export const PostCard = (props: IPostProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(props.isOpenedDefaut == true)
    return (
        <div style={props.style}>
          <Grid container direction="row" className={classes.aboutGrid}>
            <Avatar className={classes.avatar} />
            <Grid item style={{flexGrow:1, marginRight: theme.spacing(2)}}>
              <Grid container direction="column" >
                <Typography>
                  {props.postData.owner}
                </Typography>
                <Typography className={classes.descriptionBlock}>{props.postData.createdAt}</Typography>
              </Grid>
            </Grid>
            {props.postData.shortDescription &&
            <Grid item>
              <Typography style={{fontSize:"12px"}}>
                {props.postData.shortDescription}
              </Typography>
            </Grid>
            }
            <Grid item>
              {  props.onDeleteClick &&
                <IconButton
                className={classes.button} 
                onClick = {() => props.onDeleteClick && props.onDeleteClick(props.postData.id)}>
                  <DeleteIcon/>
                </IconButton>
              }
              <IconButton
              className={classes.button}  
              onClick={() => setOpen(!open)}>
                {open ?  <ExpandLessIcon/> : <ExpandMoreIcon/>}
              </IconButton>
            </Grid>
          </Grid>
          {props.postData.body && props.postData.body.length > 1 && 
          <Collapse in={open}>
            <div style={{marginTop:theme.spacing(2)}}>
              {props.postData.body?.map(
                (el, index) => <>
                    <el.Component key={index} data={el.data}/>
                    {index+1 != props.postData.body?.length && <br/>}
                  </>
              )}
            </div>
          </Collapse>
          }
        </div>
    )
}