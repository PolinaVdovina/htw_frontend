import * as React from 'react';
import { Link, Drawer, Tooltip, IconButton, List, ListItem, ListItemIcon, ListItemText, Avatar, Grid, makeStyles, Theme, createStyles, Typography, Divider, useTheme, Badge } from "@material-ui/core"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import { urls } from '../../pages/urls';
import { Link as RouterLink, LinkProps as RouterLinkProps, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { ChangeComponent } from './ChangeComponent';
import { ChangeComponentDialog } from './ChangeComponentDialog';
import { CabinetContext } from './cabinet-context';
import CreateIcon from '@material-ui/icons/Create';
import { setAvatarFetch } from '../../utils/fetchFunctions';
import { getAvatarUrl } from './../../utils/fetchFunctions';
import { updateAvatarUID } from '../../redux/reducers/user-personals-reducers';
import { useSnackbar } from 'notistack';
import { MessageStatus } from '../../utils/fetchInterfaces';
import {startLoading, stopLoading} from '../../redux/reducers/dialog-reducers'
import Resizer from 'react-image-file-resizer';
import { resize } from '../../utils/appliedFunc';

interface IDrawerElement {
  IconComponent?: any,
  title?: string,
  url?: string,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootGrid: {
      alignItems: 'center',
      width: theme.menuBar.menuWidth,
      minWidth: theme.menuBar.menuWidth,
    },

    avatarGrid: {
      flexWrap:"nowrap"
    },

    avatar: {
      width: "64px",
      height: "64px",
      marginRight:theme.spacing(2)
    },
    descriptionAndTitleBlock: {
      flexGrow:1,
      paddingRight: theme.spacing(2)
    },
    titleBlock: {
        
    },
    descriptionBlock: {
        fontSize:"12px", 
    },
    input: {
      display: 'none',
    },
    changeAvatarButton: {
      "&:hover, &.Mui-focusVisible": { 
       color: "white", 
         background: theme.palette.primary.main,
       },
       position: "relative",
       left: "-20px",
       top: "16px",
       width:"32px",
       height:"32px",
       background: theme.palette.primary.main,
   },
   changeAvatarIcon: {
     width:"20px",
     height:"20px",
     color: "white"
 }
  }),
);

interface IAccountCommonInfo {
    open?: boolean,
    onClose?: (event) => void,
    roleSettings: string,
    role?: string | null,
    token?: string | null,
    avatarUID?: string,
    updateAvatarUID: typeof updateAvatarUID,
    startLoading: typeof startLoading,
    stopLoading: typeof stopLoading
}

const AccountCommonInfoComp = (props: IAccountCommonInfo) => {
    const classes = useStyles();
    const theme = useTheme();
    const [openName, setOpenName] = React.useState(false);
    const [openAbout, setOpenAbout] = React.useState(false);
    const context = React.useContext(CabinetContext);
    const openFileDialogRef: any = React.useRef();
    const snackBar = useSnackbar();
    let name = '';
    switch(context.role) {
      default:
        if(context.surname)
          name = name + context.surname + " ";
        if(context.name)
          name = name + context.name + " ";
        if(context.middlename)
          name = name + context.middlename;
        name = (name != '' ? name : "ФИО не указано");
        break
      case "ROLE_INSTITUTION":
        name = (context.name ? context.name : "Название не указано");
        break
      case "ROLE_EMPLOYER":
        name = (context.name ? context.name : "Название не указано");
        break
    }
    
    const avatarChangeHandler = async(e) => {
      props.startLoading();
      
      const onResizedImage = async (resizedImageBlob) => {
        const messageStatus = props.token && resizedImageBlob && await setAvatarFetch(props.token, resizedImageBlob);
        if(messageStatus == MessageStatus.OK) {
          await props.updateAvatarUID();
          snackBar.enqueueSnackbar("Аватар изменен", {variant:"success"})
        } else {
          snackBar.enqueueSnackbar("Не удалость поменять аватар", {variant:"error"})
        }
        props.stopLoading();
      }

      resize(e.target.files[0], 120, onResizedImage)
      
    }

    return (
      <Grid container alignItems="center" direction="row" className={classes.avatarGrid}>
          <input 
            ref={openFileDialogRef}
            type='file'
            onChange={avatarChangeHandler}
            style={{display:"none"}}
          />
          <Badge
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          badgeContent={
              context.isMine && 
              <IconButton 
              color="primary" 
              onClick={
                () => openFileDialogRef.current.click()
              }
              className={classes.changeAvatarButton}>
                <CreateIcon className={classes.changeAvatarIcon} />
              </IconButton>
          }
          >
            <Avatar className={classes.avatar} src={getAvatarUrl(context.login) + ("?" + props.avatarUID) }/>
  
          </Badge>
          {/* <IconButton className={classes.changeAvatarButton}>
            <CreateIcon/>
          </IconButton> */}
          <Grid item container direction="column" className={classes.descriptionAndTitleBlock}>
              <Typography className={classes.titleBlock}>
                { 
                name
                }
              </Typography>
              <Typography className={classes.descriptionBlock}>
              {context.isMine &&
              <Link
              style={{textAlign:"left", wordBreak:"break-word"}}
              component='button' 
              onClick={()=>setOpenAbout(true)}>
                {context.about ? context.about : "Расскажите о себе"}
              </Link>
              }
              {
                !context.isMine && context.about
              }
              </Typography>

              <ChangeComponentDialog 
                open={openName}
                handleClickClose={() => {setOpenName(false)}}
                handleClickSave={() => {setOpenName(false)}}
                type="name"
                role={props.roleSettings}
                />
              <ChangeComponentDialog 
                open={openAbout}
                handleClickClose={() => {setOpenAbout(false)}}
                handleClickSave={() => {setOpenAbout(false)}}
                type="about"
                role={props.roleSettings}
                />
              
          </Grid>
          {
          context.isMine &&
          <Grid item>
              <Link 
                  component='button'  
                  onClick={context.isMine ? ()=>setOpenName(true) : ()=>{}}
              >
                  Изменить
              </Link>
          </Grid>
          }
      </Grid>
    )
}

export const AccountCommonInfo = connect((state: RootState) => ({
      token: state.authReducer.token,
      avatarUID: state.userPersonalsReducer.avatarUrlUid
    }), 
    {updateAvatarUID, startLoading, stopLoading}
)(AccountCommonInfoComp)