import { useTheme, Grid, Link, Divider, Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";
import React from "react";
import { VacancyEditorDialog } from "./VacancyEditorDialog";
import { Tape } from "../tape/Tape";
import { RootState } from "../../redux/store";
import { connect, useDispatch } from 'react-redux';
import { getOwnVacanciesFetch } from "../../utils/fetchFunctions";
import { startLoadingAction, stopLoadingAction } from "../../redux/actions/dialog-actions";
import { vacanciesToPostList } from './../../utils/appliedFunc';
import { CabinetContext } from './../cabinet/cabinet-context';
import { getVacanciesByLoginFetch } from './../../utils/fetchFunctions';

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
  return (
    <>
      <Grid container direction="row-reverse"  style={{padding: theme.spacing(2)}}>
        <VacancyEditorDialog
        onClose={() => setOpenVacancyDialog(false)} 
        onSubmitSuccess={() => {
          setOpenVacancyDialog(false);
          getVacancies();
        }} 
        open={openVacancyDialog}/>
        <Dialog 
        onClose={() => setDeletingId(null)}
        open={deletingId != null}>
          <DialogTitle>Вы точно хотите удалить вакансию?</DialogTitle>
          <DialogActions>
            <Button>
              Да
            </Button>
            <Button onClick={() => setDeletingId(null)}>
              Нет
            </Button>
          </DialogActions>
        </Dialog>

        <Link component='button' onClick={()=>setOpenVacancyDialog(true)}>Добавить вакансию</Link>
      </Grid>
      <Divider/>
      <Tape
        onDeleteClick={(id) => setDeletingId(id)}
        posts = {
          vacancies && vacanciesToPostList(vacancies)
        }
      />
    </>)
}

export const VacancyTab = connect(mapStateToProps)(VacancyTabComp);
  