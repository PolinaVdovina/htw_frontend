import { Button, Card, Grid, Typography, makeStyles, Theme, createStyles, Paper, Avatar, Divider, IconButton, Collapse, Link } from '@material-ui/core';
import * as React from 'react';
import { Redirect } from 'react-router';
import { PaddingPaper } from '../../cards/PaddingPaper';
import { BodyElementComp } from './post-body-elements/post-body-element';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { useTheme } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { urls } from '../../../pages/urls';
import { getAvatarUrl } from '../../../utils/fetchFunctions';
import { connect } from 'react-redux';
import { RootState, store } from '../../../redux/store';
import { Tooltip } from '@material-ui/core';
import { RespondButton } from '../../cabinet/employer/RespondButton';

export interface IBodyElement {
  data?: any,
  Component: BodyElementComp,
}

type SubButtonType = {
  IconComponent: any,
  key: string
}

export interface ITapeElementData {
  id?: any,
  body?: Array<IBodyElement>,
  fileList?: FileList,
  bottomText?: string,
  lastChange?: string,
  createdDate?: string,
  title?: string | null,
  rightText?: string,
  ownerLogin?: string, 
}

export interface ITapeElementProps {
  tapeElementData: ITapeElementData,
  avatarUrlUid: any,
  style: any,
  userRole?: string | null | undefined,
  token: any,
  isOpenedDefaut?: boolean,
  onDeleteClick?: ((postId: any) => void) | null,
  onChangeClick?: (postId: any) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    aboutGrid: {
      alignItems: "center",
      flexWrap: "nowrap",
      wordBreak: "break-word"

    },
    avatar: {
      marginRight: theme.spacing(1),
    },
    descriptionBlock: {
      fontSize: "12px",
    },
    openBlock: {
      maxHeight: "2000px",
      overflow: "hidden",
      transition: "all 1s ease-out",
    },
    closedBlock: {
      maxHeight: "0px",
      overflow: "hidden",
      transition: "all 1s ease-out",
    },
    button: {
      width: "32px",
      height: "32px",
    }
  }),
);



const TapeElementCardComp = (props: ITapeElementProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(props.isOpenedDefaut == true)
  return (
    <div style={props.style}>
      <Grid container direction="row" className={classes.aboutGrid}>
        {
          props.tapeElementData.ownerLogin ?
            <Avatar
              src={getAvatarUrl(props.tapeElementData.ownerLogin) + "?uid=" + props.avatarUrlUid}
              component={RouterLink}
              to={urls.cabinet.shortPath + props.tapeElementData.ownerLogin}
              className={classes.avatar} />
            :
            <Avatar className={classes.avatar} />
        }
        <Grid item style={{ flexGrow: 1, marginRight: theme.spacing(2) }}>
          <Grid container direction="column" >
            {props.tapeElementData.title && props.tapeElementData.ownerLogin &&
              <Typography
                color='inherit'
                style={{textDecoration:"none"}}
                component={RouterLink} to={urls.cabinet.shortPath + props.tapeElementData.ownerLogin}>
                {props.tapeElementData.title}
              </Typography>
            }
            {props.tapeElementData.title && !props.tapeElementData.ownerLogin &&
              <Typography>
                {props.tapeElementData.title}
              </Typography>
            }
            <Typography className={classes.descriptionBlock}>{props.tapeElementData.bottomText}</Typography>
          </Grid>
        </Grid>
        { props.userRole == "ROLE_JOBSEEKER" &&
            <Grid item>
              <RespondButton id={props.tapeElementData.id} token={props.token}></RespondButton>
            </Grid>
        }
        {props.tapeElementData.rightText &&
          <Grid item>
            <Typography style={{ fontSize: "12px" }}>
              {props.tapeElementData.rightText}
            </Typography>
          </Grid>
        }
        <Grid item>
          {props.onDeleteClick &&
            <Tooltip title="Удалить">
              <IconButton
                className={classes.button}
                onClick={() => props.onDeleteClick && props.onDeleteClick(props.tapeElementData.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }
          {props.tapeElementData.body && props.tapeElementData.body.length > 1 &&
            <Tooltip title={open ? "Скрыть подробности" : "Показать подробности"}>
              <IconButton
                className={classes.button}
                onClick={() => setOpen(!open)}>
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Tooltip>
          }
        </Grid>
      </Grid>
      {props.tapeElementData.body && props.tapeElementData.body.length > 1 &&
        <Collapse in={open}>
          <div style={{ marginTop: theme.spacing(2) }}>
            {props.tapeElementData.body?.map(
              (el, index) => <>
                <el.Component key={index} data={el.data} />
                {index + 1 != props.tapeElementData.body?.length && <br />}
              </>
            )}
          </div>
        </Collapse>
      }
    </div>
  )
}

export const TapeElement = connect((state: RootState) => ({ 
	avatarUrlUid: state.userPersonalsReducer.avatarUrlUid, 
	userRole: state.authReducer.entityType, 
	token: state.authReducer.token }))(TapeElementCardComp);