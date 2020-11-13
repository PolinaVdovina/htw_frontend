import { useTheme, Grid, Divider, Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";
import React from "react";
import { VacancyEditorDialog } from "../../vacancy-editor/VacancyEditorDialog";
import { Tape } from "../../tape/Tape";
import { RootState } from "../../../redux/store";
import { connect, useDispatch } from 'react-redux';
import { removeVacancyFetch } from "../../../utils/fetchFunctions";
import { startLoadingAction, stopLoadingAction } from "../../../redux/actions/dialog-actions";
import { CabinetContext } from '../cabinet-context';
import AddEntityBlock from "../AddEntityBlock";
import { vacancyToPost } from "../../../utils/tape-converters/vacancy-to-tape-element";
import { TapeFetcherProvider, TapeFetcherContext } from '../../tape/TapeFetcherContext';
import { searchCriteriaFetch } from '../../../utils/fetchFunctions';
import { SortCriteriaDirection, SearchCriteriaOperation } from "../../../utils/search-criteria/types";
import { searchCriteria, sortCriteria } from "../../../utils/search-criteria/builders";
import { pagination } from '../../../utils/search-criteria/builders';
import { useSnackbar } from "notistack";
import { MessageStatus } from "../../../utils/fetchInterfaces";

function mapStateToProps(state: RootState) {
  return {
    token: state.authReducer.token,
  }
}

const VacancyTabComp = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const cabinetContext = React.useContext(CabinetContext);
  const tapeFetcherContext = React.useContext(TapeFetcherContext);
  const snackbar = useSnackbar();

  return (
    <div>
      <Tape
        onDeleteClick={(id) => { props.onDeleteClick(id)}}

        isRespondActive={true}
        isRespondViewActive={cabinetContext.isMine ? true : false}
        elements={
          tapeFetcherContext?.tapeElements
        }
      />
      <Grid item style={{ flexGrow: 1 }}>
        <Button
          variant="contained"
          color="primary" fullWidth
          onClick={props.getNextVacancies}
          style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        >
          Дальше
        </Button>
      </Grid>
    </div>)
}

export const VacancyList = connect(mapStateToProps)(VacancyTabComp);
