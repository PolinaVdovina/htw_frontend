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
import { searchCriteriaFetch } from './../../../utils/fetchFunctions';
import { SortCriteriaDirection, SearchCriteriaOperation } from "../../../utils/search-criteria/types";
import { searchCriteria, sortCriteria } from "../../../utils/search-criteria/builders";
import { pagination } from './../../../utils/search-criteria/builders';
import { useSnackbar } from "notistack";
import { MessageStatus } from "../../../utils/fetchInterfaces";

function mapStateToProps(state: RootState) {
  return {
    token: state.authReducer.token,
  }
}

const VacancyTabComp = (props) => {
  const theme = useTheme();
  const [openVacancyDialog, setOpenVacancyDialog] = React.useState(false);

  const [deletingId, setDeletingId] = React.useState<any>(null);
  const [vacancies, setVacancies] = React.useState<any>(null);
  const dispatch = useDispatch();
  const cabinetContext = React.useContext(CabinetContext);
  const tapeFetcherContext = React.useContext(TapeFetcherContext);

  const snackbar = useSnackbar();

  const getNextVacancies = async () => {
    const mineCriteria = (cabinetContext.role == "ROLE_EMPLOYER") ?
      searchCriteria("employerLogin", cabinetContext.login, SearchCriteriaOperation.EQUAL)
      :
      searchCriteria("employeeLogin", cabinetContext.login, SearchCriteriaOperation.EQUAL)

    await tapeFetcherContext?.fetchNext(
      (lastPostDate, dataCount) => searchCriteriaFetch("/vacancy/getBySearchCriteria", props.token,
        {
          searchCriteria: [searchCriteria("createdDate", lastPostDate, SearchCriteriaOperation.LESS),
          searchCriteria("active", true, SearchCriteriaOperation.EQUAL),
            mineCriteria],
          sortCriteria: [sortCriteria("createdDate", SortCriteriaDirection.DESC)],
          pagination: pagination(5)
        }));
  }

  React.useEffect(() => {
    getNextVacancies();
  }, [])

  const onDeleteVacancy = async () => {
    dispatch(startLoadingAction());
    const result = await removeVacancyFetch(props.token, deletingId);
    if (result == MessageStatus.OK) {
      snackbar.enqueueSnackbar("Вакансия успешно удалена", { variant: "success" });
      tapeFetcherContext?.deleteTapeElement(deletingId);
    }
    else
      snackbar.enqueueSnackbar("Не удалось удалить вакансию", { variant: "error" });

    setDeletingId(null);
    dispatch(stopLoadingAction());
  }

  return (
    <div>
      {cabinetContext.isMine &&
        <>

          <Grid container direction="row-reverse" style={{ padding: theme.spacing(2) }}>
            <VacancyEditorDialog
              onClose={() => setOpenVacancyDialog(false)}
              onSubmitSuccess={async (vacancy) => {
                await dispatch(startLoadingAction());
                tapeFetcherContext?.addTapeElementAtFirst(vacancy);
                await dispatch(stopLoadingAction());
                await setOpenVacancyDialog(false);
              }}
              open={openVacancyDialog} />
            <Dialog
              onClose={() => setDeletingId(null)}
              open={deletingId != null}>
              <DialogTitle>Вы точно хотите удалить вакансию?</DialogTitle>
              <DialogActions>
                <Button onClick={onDeleteVacancy}>
                  Да
              </Button>
                <Button onClick={() => setDeletingId(null)}>
                  Нет
              </Button>
              </DialogActions>
            </Dialog>

            <AddEntityBlock handleClickOpen={() => setOpenVacancyDialog(true)} />
          </Grid>
          <Divider />
        </>}
      <Tape
        onDeleteClick={cabinetContext.isMine ? (id) => setDeletingId(id) : null}
        elements={
          tapeFetcherContext?.tapeElements
        }
      />
      <Grid item style={{ flexGrow: 1 }}>
        <Button variant="contained" color="primary" fullWidth onClick={getNextVacancies} style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>Дальше</Button>
      </Grid>
    </div>)
}

export const VacancyTab = connect(mapStateToProps)(VacancyTabComp);
