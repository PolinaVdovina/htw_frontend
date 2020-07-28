import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, Paper, Avatar, Divider, IconButton, Collapse} from '@material-ui/core';
import * as React from 'react';
import { Redirect } from 'react-router';
import { PaddingPaper } from '../../cards/PaddingPaper';
import { BodyElementComp } from './post-body-elements/post-body-element';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

export interface IBodyElement {
  data?: any,
  Component: BodyElementComp,
}

export interface IPostData {
  title?: string,
  body?: Array<IBodyElement>,
  fileList?: FileList,
  createdAt?: string,
  lastChange?: string,
  owner?: string,    
  shortDescription?: string
}

interface IPostProps {
  postData: IPostData,
  style: any,
  isOpenedDefaut?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    aboutGrid: {
      alignItems: "center",
      flexWrap: "nowrap",
      marginBottom: theme.spacing(1)
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
    }
  }),
);



export const PostCard = (props: IPostProps) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(props.isOpenedDefaut == true)
    return (
        <div style={props.style}>
          <Grid container direction="row" className={classes.aboutGrid}>
            <Avatar className={classes.avatar} />
            <Grid item style={{flexGrow:1}}>
              <Grid container direction="column" >
                <Typography>
                  {props.postData.owner}
                </Typography>
                <Typography className={classes.descriptionBlock}>{props.postData.createdAt}</Typography>
              </Grid>
            </Grid>
            {props.postData.shortDescription &&
            <Grid item>
              <Typography>{props.postData.shortDescription}</Typography>
            </Grid>
            }
            <Grid item>
              <IconButton onClick={() => setOpen(!open)}>
                {open ?  <ExpandLessIcon/> : <ExpandMoreIcon/>}
              </IconButton>
            </Grid>
          </Grid>
          <div>
            <Collapse in={open}>
              {props.postData.body?.map(
                (el, index) => <>
                    <el.Component key={index} data={el.data}/>
                    {index+1 != props.postData.body?.length && <br/>}
                  </>
              )}
            </Collapse>
          </div>
        </div>
    )
}