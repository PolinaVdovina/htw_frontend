import * as React from 'react';
import { Drawer, Tooltip, IconButton, List, ListItem, ListItemIcon, ListItemText, Avatar, Grid, makeStyles, Theme, createStyles, Typography, Divider, useTheme, TextField, Button, Collapse, useMediaQuery } from "@material-ui/core"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import { urls } from '../../pages/urls';
import { SearchSettingsType } from './settings/settings-type';
import { FilterTextField } from './filter-fields/FilterTextField';
import { ISearchCriteria } from '../../utils/search-criteria/types';
import { useContext, useState, useEffect } from 'react';
import { FilterContext } from './FilterContext';
import { TapeFetcher } from '../tape/TapeFetcher_OLD';
import { TapeFetcherContext } from '../tape/TapeFetcherContext';
import CancelIcon from '@material-ui/icons/Cancel';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootGrid: {

      padding: theme.spacing(1),
    },
    title: {

    },
    row: {
      flexWrap: "nowrap"
    }
  }),
);

interface IFilterFormProps {
  open?: boolean,
  onClose?: (event) => void,
  settings: SearchSettingsType,
  values?: Array<any> | null,
  setValue?: (index: number, value: any) => void
}

export const FilterForm = (props: IFilterFormProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const filterContext = useContext(FilterContext);
  const tapeFetcherContext = useContext(TapeFetcherContext);
  const [isChanged, setChanged] = React.useState(false);
  const [collapsedIds, setCollapsedIds] = React.useState({});

  const toggleCollapse = (id: number) => {
    if (collapsedIds[id]) {
      setCollapsedIds({ ...collapsedIds, [id]: !collapsedIds[id] })
    } else {
      setCollapsedIds({ ...collapsedIds, [id]: true })
    }

  }

  const [values, setValues] = React.useState<Array<any>>(
    new Array(props.settings.length)
  );


  const setValue = (index: number, value: any) => {
    let newValues: Array<any> = [...values];  //создаю копию
    newValues[index] = value;
    setValues([...newValues]);
    setChanged(true);
  }

  const convertValuesToSearchCriteria = () => {

    let searchCriteria: Array<ISearchCriteria> = [];
    props.settings.forEach((settingValue, settingIndex) => {

      if (values[settingIndex] && !(Array.isArray(values[settingIndex]) && values[settingIndex].length == 0) ) {
        const convertedValue = settingValue.searchCriteriaConverter(values[settingIndex]);
        if (convertedValue)
          searchCriteria.push(...convertedValue);
      }
    });
    filterContext?.setSearchCriteria(searchCriteria);
  }

  const getComponentByKey = (key: string) => {
    return props.settings[key].Component;
  }

  const closeHandler = (event) => {
    if (isChanged) {
      convertValuesToSearchCriteria();
      setChanged(false);
    }
    props.onClose && props.onClose(event);
  }
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Drawer
      open={props.open}
      onClose={closeHandler}
      variant="temporary"
      PaperProps={{ style: { width: fullScreen ? "100%" : "400px" } }}>
      <Grid
        container
        direction={"column"}
        className={classes.rootGrid}>
        <Grid alignContent="center" item container >
          <Typography
            variant="h5"
            className={classes.title}
            style={{ flexGrow: 1, marginRight: theme.spacing(1) }}>
            Фильтры
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={closeHandler}>
            Применить
          </Button>
        </Grid>

        <Divider style={{ marginTop: theme.spacing(2) }} />
        {
          props.settings.map((settingValue, settingIndex) =>
            <>
              <Grid
                key={settingIndex}
                container direction={"column"}
                style={{ marginBottom: theme.spacing(2), }}>
                <Grid
                  className={classes.row}
                  alignItems="center"
                  alignContent="center"
                  item container
                  direction="row" >
                  <Typography style={{ flexGrow: 1 }}>
                    {settingValue.title}
                  </Typography>
                  {
                    settingValue.collapse &&
                    <Tooltip title={collapsedIds[settingIndex] ? "Скрыть" : "Показать"}>
                      <IconButton onClick={() => toggleCollapse(settingIndex)}>
                        {collapsedIds[settingIndex] ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </Tooltip>
                  }
                  <Tooltip title="Удалить фильтр">
                    <IconButton onClick={() => setValue(settingIndex, null)}>
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                {
                  settingValue.collapse ?
                    <Collapse in={settingValue.collapse ? collapsedIds[settingIndex] : true}>
                      {
                        <settingValue.Component
                          value={values[settingIndex]}
                          key={settingIndex}
                          onChange={(value) => setValue(settingIndex, value)} />
                      }
                    </Collapse>
                    :
                    <settingValue.Component
                      value={values[settingIndex]}
                      key={settingIndex}
                      onChange={(value) => setValue(settingIndex, value)} />
                }

              </Grid>
              <Divider style={{ marginTop: theme.spacing(1) }} />
            </>
          )
        }
      </Grid>
    </Drawer>
  )
}