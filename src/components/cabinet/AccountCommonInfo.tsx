import * as React from 'react';
import { Link, Drawer, Tooltip, IconButton, List, ListItem, ListItemIcon, ListItemText, Avatar, Grid, makeStyles, Theme, createStyles, Typography, Divider, useTheme, Badge, Button } from "@material-ui/core"
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
import { setAvatarFetch, subscribeFetch } from '../../utils/fetchFunctions';
import { getAvatarUrl, unsubscribeFetch } from './../../utils/fetchFunctions';
import { updateAvatarUID } from '../../redux/reducers/user-personals-reducers';
import { useSnackbar } from 'notistack';
import { MessageStatus } from '../../utils/fetchInterfaces';
import { startLoading, stopLoading } from '../../redux/reducers/dialog-reducers'
import Resizer from 'react-image-file-resizer';
import { resize } from '../../utils/appliedFunc';
import { subscribe, unsubscribe } from './../../redux/reducers/user-personals-reducers';
import { showChat } from './../../redux/reducers/chat-reducers';
import { getStompClient } from './../../websockets/common';
import { subscribeToOnlineTracking } from '../../websockets/chat/actions';

interface IDrawerElement {
  IconComponent?: any,
  title?: string,
  url?: string,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootGrid: {
      //alignItems: 'center',
      width: theme.menuBar.menuWidth,
      minWidth: theme.menuBar.menuWidth,
    },

    avatarGrid: {
      flexWrap: "nowrap"
    },

    avatar: {
      width: "64px",
      height: "64px",
      marginRight: theme.spacing(2),
      alignSelf: "center",
    },
    descriptionAndTitleBlock: {
      flexGrow: 1,
      paddingRight: theme.spacing(2),
      alignSelf: "center",
    },
    titleBlock: {

    },
    descriptionBlock: {
      fontSize: "12px",
    },
    input: {
      display: 'none',
    },
    changeName: {
      //alignSelf: "flex-start",
      alignItems: "end",
      width: "auto"
    },
    changeAvatarButton: {
      "&:hover, &.Mui-focusVisible": {
        color: "white",
        background: theme.palette.primary.main,
      },
      position: "relative",
      left: "-20px",
      top: "16px",
      width: "26px",
      height: "26px",
      background: theme.palette.primary.main,
    },
    changeAvatarIcon: {
      width: "16px",
      height: "16px",
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
  stopLoading: typeof stopLoading,
  subscribe: typeof subscribe,
  unsubscribe: typeof unsubscribe,
  subscriptionLogins?: Array<string> | null,
  showChat: typeof showChat
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
  switch (context.role) {
    default:
      if (context.surname)
        name = name + context.surname + " ";
      if (context.name)
        name = name + context.name + " ";
      if (context.middlename)
        name = name + context.middlename;
      if (context.isMine)
        name = (name != '' ? name : "ФИО не указано");
      else
        name = (name != '' ? name : context.login);
      break
    case "ROLE_INSTITUTION":
      if (context.isMine)
        name = (context.name ? context.name : "Название не указано");
      else
        name = (context.name ? context.name : context.login);
      break
    case "ROLE_EMPLOYER":
      if (context.isMine)
        name = (context.name ? context.name : "Название не указано");
      else
        name = (context.name ? context.name : context.login);
      break
  }

  const avatarChangeHandler = async (e) => {
    props.startLoading();
    //alert("herh")
    const onResizedImage = async (resizedImageBlob) => {
      const messageStatus = props.token && resizedImageBlob && await setAvatarFetch(props.token, resizedImageBlob);
      if (messageStatus == MessageStatus.OK) {
        await props.updateAvatarUID();
        snackBar.enqueueSnackbar("Аватар изменен", { variant: "success" })
      } else {
        snackBar.enqueueSnackbar("Не удалость поменять аватар", { variant: "error" })
      }
      props.stopLoading();
    }

    resize(e.target.files[0], 120, onResizedImage)

  }

  const openChatHandler = () => {
    props.showChat(context.login, context.viewName)
  }

  const subscribeHandler = async () => {
    if (props.token && context && context.login)
      await props.subscribe(props.token, context.login);
  }

  const unsubscribeHandler = async () => {
    if (props.token && context && context.login)
      await props.unsubscribe(props.token, context.login);
  }

  let roleTitle = ""
  switch (context.role) {
    case "ROLE_JOBSEEKER":
      roleTitle = "СОИСКАТЕЛЬ"
      break;
    case "ROLE_EMPLOYER":
      roleTitle = "РАБОТОДАТЕЛЬ"
      break;
    case "ROLE_EMPLOYEE":
      roleTitle = "СОТРУДНИК"
      break;
    case "ROLE_INSTITUTION":
      roleTitle = "ОБРАЗОВАТЕЛЬНОЕ УЧР."
      break;
  }

  return (
    <Grid container /* alignItems="center" */ direction="row" className={classes.avatarGrid}>
      <input
        ref={openFileDialogRef}
        type='file'
        onChange={avatarChangeHandler}
        style={{ display: "none" }}
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
        <Avatar className={classes.avatar} src={getAvatarUrl(context.login) + ("?" + props.avatarUID)} />

      </Badge>
      {/* <IconButton className={classes.changeAvatarButton}>
            <CreateIcon/>
          </IconButton> */}
      <Grid item container direction="column" className={classes.descriptionAndTitleBlock}>
        <Typography style={{ fontWeight: "bold" }} className={classes.titleBlock}>
          {
            roleTitle
          }
        </Typography>
        <Typography className={classes.titleBlock}>
          {
            name
          }
        </Typography>
        <Typography className={classes.descriptionBlock}>
          {context.isMine &&
            <Link
              style={{ textAlign: "left", wordBreak: "break-word" }}
              component='button'
              onClick={() => setOpenAbout(true)}>
              {(context.about && (context.about.replace(/\s/g, "") != "")) ? context.about : ((context.role == 'ROLE_JOBSEEKER' || context.role == 'ROLE_EMPLOYEE') ? "Расскажите о себе" : "Укажите сайт учреждения")}
            </Link>
          }
          {
            !context.isMine && <Typography style={{ textAlign: "left", wordBreak: "break-word", fontSize: "12px" }}>{context.about}</Typography>
          }
        </Typography>

        <ChangeComponentDialog
          open={openName}
          handleClickClose={() => { setOpenName(false) }}
          type="name"
          role={props.roleSettings}
        />
        <ChangeComponentDialog
          open={openAbout}
          handleClickClose={() => { setOpenAbout(false) }}
          type="about"
          role={props.roleSettings}
        />

      </Grid>


      <Grid
        item container

        direction="column"
        className={classes.changeName}
      >


        {
          context.isMine &&
          <Link
            component='button'
            onClick={context.isMine ? () => setOpenName(true) : () => { }}
          >
            Изменить
            </Link>
        }
        {
          !context.isMine && (props.subscriptionLogins == null || !props.subscriptionLogins?.includes(context.login)) &&
          <Link
            onClick={subscribeHandler}
            component='button'
          >
            Подписаться
            </Link>
        }
        {
          !context.isMine && (props.subscriptionLogins != null && props.subscriptionLogins?.includes(context.login)) &&
          <Link
            onClick={unsubscribeHandler}
            component='button'
          >
            Отписаться
            </Link>
        }



        {
          !context.isMine &&
          <Link
            onClick={openChatHandler}
            component='button'
            style={{ marginTop: theme.spacing(1) }}
          >
            Сообщение
          </Link>
        }

        <div style={{ flexGrow: 1 }} />

        {
          context.isOnline == true &&
          <Typography
            style={{ marginTop: theme.spacing(1), width: "max-content" }}
            key={context.login}
          >
            В сети
            </Typography>
        }

        {
          context.isOnline == false &&
          <Typography
            style={{ marginTop: theme.spacing(1), width: "max-content" }}
            key={context.login}
          >
            Не в сети
          </Typography>
        }


      </Grid>

    </Grid>
  )
}

export const AccountCommonInfo = connect((state: RootState) => ({
  token: state.authReducer.token,
  avatarUID: state.userPersonalsReducer.avatarUrlUid,
  subscriptionLogins: state.userPersonalsReducer.subscriptionLogins,
}),
  { updateAvatarUID, startLoading, stopLoading, subscribe, unsubscribe, showChat }
)(AccountCommonInfoComp)