import { useTheme, Grid, Link, Divider, Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";
import React from "react";
import { VacancyEditorDialog } from "../../vacancy-editor/VacancyEditorDialog";
import { Tape } from "../../tape/Tape";
import { RootState } from "../../../redux/store";
import { connect, useDispatch } from 'react-redux';
import { getOwnVacanciesFetch, removeVacancyFetch } from "../../../utils/fetchFunctions";
import { startLoadingAction, stopLoadingAction } from "../../../redux/actions/dialog-actions";
import { vacanciesToPostList } from '../../../utils/appliedFunc';
import { CabinetContext } from '../cabinet-context';
import { getVacanciesByLoginFetch } from '../../../utils/fetchFunctions';
import { MessageStatus } from "../../../utils/fetchInterfaces";
import { useSnackbar } from 'notistack';
import AddEntityBlock from "../AddEntityBlock";

function mapStateToProps(state : RootState) {
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
  const context = React.useContext(CabinetContext);
  const snackbar = useSnackbar();
  const getVacancies = async() => {
    await dispatch(startLoadingAction());
    const fetchedData = await getVacanciesByLoginFetch(props.token, context.login);
    await setVacancies(fetchedData);
    await dispatch(stopLoadingAction());
  }
  
  React.useEffect(() => {
    const fetchedData = getVacancies();
  }, [])
  //alert(vacancies)
  const onDeleteVacancy = async() => {
    //alert(deletingId)
    dispatch(startLoadingAction());
    const result = await removeVacancyFetch(props.token, deletingId);
    if(result == MessageStatus.OK) {
      await getVacancies();
      snackbar.enqueueSnackbar("Вакансия успешно удалена", {variant:"success"});
    }
    else
      snackbar.enqueueSnackbar("Не удалось удалить вакансию", {variant:"error"});
    
    setDeletingId(null);
    dispatch(stopLoadingAction());
  }

  return (
    <>
      {context.isMine && 
      <>
      <Grid container direction="row-reverse"  style={{padding: theme.spacing(2)}}>
        <VacancyEditorDialog
        onClose={() => setOpenVacancyDialog(false)} 
        onSubmitSuccess={async() => {
          await dispatch(startLoadingAction());
          await getVacancies();
          await dispatch(stopLoadingAction());
          await setOpenVacancyDialog(false);
        }} 
        open={openVacancyDialog}/>
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

        <AddEntityBlock handleClickOpen={()=>setOpenVacancyDialog(true)}/>
        </Grid>
        <Divider/>
      </>}
      <Tape
        onDeleteClick={context.isMine ? (id) => setDeletingId(id) : null}
        posts = {
          vacancies && vacanciesToPostList(vacancies)
        }
      />
    </>)
}

export const VacancyTab = connect(mapStateToProps)(VacancyTabComp);
  