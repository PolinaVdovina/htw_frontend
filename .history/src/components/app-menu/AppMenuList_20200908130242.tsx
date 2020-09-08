import * as React from 'react';
import { Drawer, Tooltip, IconButton, List, ListItem, ListItemIcon, ListItemText, Avatar, Grid, makeStyles, Theme, createStyles, Typography, Divider, useTheme, Collapse } from "@material-ui/core"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import { urls } from '../../pages/urls';
import { Link as RouterLink, LinkProps as RouterLinkProps, NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/reducers/auth-reducers';
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit';
import { store } from './../../redux/store';
import { getAvatarUrl } from '../../utils/fetchFunctions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SearchIcon from '@material-ui/icons/Search'; //поиск 
import ContactlessIcon from '@material-ui/icons/Contactless';

interface IDrawerElement {
  IconComponent?: any,
  title?: string,
  url?: string,
  func?: (...arg) => void,
  addLogin?: boolean,
}

interface IDrawerGroup {
  isRoot?: boolean,
  elements: Array<IDrawerElement>
  title: string,
  IconComponent?: any,
}

const drawerGroups: Array<IDrawerGroup> = [
  {
    isRoot: true,
    title: "Корень",
    elements: [
      {
        IconComponent: AccountCircleIcon,
        title: "Личный кабинет",
        url: urls.cabinet.shortPath,
        addLogin: true,
      }
    ]
  },

  {
    title: "Поиск",
    IconComponent: SearchIcon,
    elements: [
      {
        //IconComponent: AccountCircleIcon,
        title: "Вакансии",
        url: urls.search.shortPath + "vacancy",
      },
      {
        //IconComponent: AccountCircleIcon,
        title: "Соискатели",
        url: urls.search.shortPath + "jobseeker",
      },
      {
        //IconComponent: AccountCircleIcon,
        title: "Работодатели",
        url: urls.search.shortPath + "employer",
      },
      {
        //IconComponent: AccountCircleIcon,
        title: "Образовательные учреждения",
        url: urls.search.shortPath + "institution",
      }
    ]
  },

  {
    title: "События",
    IconComponent: ContactlessIcon,
    elements: [
      {
        //IconComponent: AccountCircleIcon,
        title: "Вакансии",
        url: urls.news.shortPath + "vacancy",
      },
      /*{
        //IconComponent: AccountCircleIcon,
        title: "Соискатели",
        url: urls.search.shortPath + "jobseeker",
      },
      {
        //IconComponent: AccountCircleIcon,
        title: "Работодатели",
        url: urls.search.shortPath + "employer",
      },
      {
        //IconComponent: AccountCircleIcon,
        title: "Образовательные учреждения",
        url: urls.news.shortPath + "institution",
      }*/
    ]
  },



  {
    isRoot: true,
    title: "Корень2",
    elements: [
      {
        IconComponent: TransitEnterexitIcon,
        title: "Выход",

        func: async (dispatch) => { await dispatch(logout)(dispatch) }
      }
    ]
  },
]

const drawerElementsDict: Array<IDrawerElement> = [
  {
    IconComponent: AccountCircleIcon,
    title: "Личный кабинет",
    url: urls.cabinet.shortPath,
    addLogin: true,

  },
  {
    IconComponent: LibraryBooksIcon,
    title: "Вакансии",
    url: urls.home.shortPath,
  },
  {
    IconComponent: PlaylistAddCheckIcon,
    title: "Рекомендации",
    url: "/"
  },
  {
    IconComponent: NotificationsIcon,
    title: "Уведомления",
    url: "/"
  },
  {
    IconComponent: ChatIcon,
    title: "Сообщения",
    url: "/"
  },
  {
    IconComponent: TransitEnterexitIcon,
    title: "Выйти",
    func: async (dispatch) => { await dispatch(logout)(dispatch) }
  },
]



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootGrid: {
      alignItems: 'center',
      width: theme.menuBar.menuWidth,
      minWidth: theme.menuBar.menuWidth,
    },

    avatarGrid: {
      padding: "12px",
      backgroundColor: theme.palette.primary.main
    },

    avatar: {
      width: "64px",
      height: "64px"
    },

    listButtonsGrid: {
      width: "100%",
    },
    listButtons: {
      width: "100%",
    },
    nestedButtons: {
      paddingLeft: theme.spacing(5),
    },
    notNestedButtons: {

    }
  }),
);



/* const DrawerListButtons = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <List className={classes.listButtons}>
      {
        drawerElementsDict.map((el, index) =>
          <ListItem key={index} button
            {...{ component: el.url && NavLink, to: el.url + (el.addLogin ? props.login : '') || null }}
            onClick={() => { el.func && el.func(dispatch) }}>
            <ListItemIcon>
              <el.IconComponent />
            </ListItemIcon>
            <ListItemText primary={el.title} />
          </ListItem >
        )
      }
    </List>
  )
} */

const GroupElements = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <List disablePadding className={classes.listButtons}>
      {
        props.elements.map((el, index) =>
          <ListItem
            key={index} button
            className={props.nested ? classes.nestedButtons : classes.notNestedButtons}
            {...{ component: el.url && NavLink, to: el.url + (el.addLogin ? props.login : '') || null }}
            onClick={() => { el.func && el.func(dispatch) }}>

            {el.IconComponent &&
              <ListItemIcon>
                <el.IconComponent />
              </ListItemIcon>
            }
            <ListItemText primary={el.title} />
          </ListItem >
        )
      }
    </List>
  )
}

const DrawerGroups = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openedGroupsIndex, setOpenedGroupsIndex] = React.useState<Array<number>>([]);

  const handleClick = (groupIndex) => {
    const isOpened = openedGroupsIndex.includes(groupIndex);
    if (!isOpened)
      setOpenedGroupsIndex([/* ...openedGroupsIndex,  */groupIndex]);
    else
      setOpenedGroupsIndex(openedGroupsIndex.filter(v => v != groupIndex));
  }

  return (
    <List className={classes.listButtons}>
      {
        drawerGroups.map(
          (group, groupIndex) => {
            if (group.isRoot) {
              return <GroupElements key={groupIndex} login={props.login} elements={group.elements} />
            } else {
              return (
                <div key={groupIndex}>
                  <ListItem button onClick={() => handleClick(groupIndex)}>
                    {group.IconComponent && <ListItemIcon><group.IconComponent /></ListItemIcon>}
                    <ListItemText primary={group.title} />
                    {openedGroupsIndex.includes(groupIndex) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItem>
                  <Collapse in={openedGroupsIndex.includes(groupIndex)}>
                    <GroupElements login={props.login} elements={group.elements} nested={true} />
                  </Collapse>
                </div>
              )
            }
          }
        )
      }
    </List>
  )
}


interface IAppMenuList {
  open?: boolean,
  onClose?: (event) => void,
  name: string,
  surname: string,
  login?: string | null,
  role?: string | null,
  avatarUID: any
}

function mapStateToProps(state: RootState) {
  return {
    name: state.userPersonalsReducer.name,
    surname: state.userPersonalsReducer.surname,
    login: state.authReducer.login,
    token: state.authReducer.token,
    role: state.authReducer.entityType,
    avatarUID: state.userPersonalsReducer.avatarUrlUid,
  }
}

const AppMenuListComp = (props: IAppMenuList) => {
  const classes = useStyles();
  const theme = useTheme();
  const login = 10;
  return (
    <Grid container direction="column" className={classes.rootGrid}>
      <Grid container item alignItems="center" direction="row" className={classes.avatarGrid}>

        <Avatar
          src={props.login ? getAvatarUrl(props.login) + ("?" + props.avatarUID) : ""}
          className={classes.avatar}
          component={NavLink} to={urls.cabinet.shortPath + props.login}
          style={{ marginRight: theme.spacing(2) }} />

        <Typography style={{ flexGrow: 1, width: "min-content", color: "white" }}>
          {(props.role == "ROLE_JOBSEEKER" || props.role == "ROLE_EMPLOYEE") && ((props.name && props.surname) ? props.surname + ' ' + props.name : props.login)}
          {(props.role == "ROLE_EMPLOYER" || props.role == "ROLE_INSTITUTION") && (props.name ? props.name : props.login)}
        </Typography>

      </Grid>
      <Grid item container className={classes.listButtonsGrid}>
        <DrawerGroups login={props.login} />
      </Grid>
    </Grid>
  )
}

export const AppMenuList = connect(mapStateToProps)(AppMenuListComp);