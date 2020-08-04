import { useTheme, Grid, Link, Divider } from "@material-ui/core";
import React from "react";
import { VacancyEditorDialog } from "./VacancyEditorDialog";
import { Tape } from "../tape/Tape";
import { RootState } from "../../redux/store";
import { connect, useDispatch } from 'react-redux';
import { getOwnVacanciesFetch } from "../../utils/fetchFunctions";
import { startLoadingAction, stopLoadingAction } from "../../redux/actions/dialog-actions";
import { vacanciesToPostList } from './../../utils/appliedFunc';

function mapStateToProps(state : RootState) {
  return {
      token: state.authReducer.token,
  }
}


const VacancyTabComp = (props) => {
  const theme = useTheme();
  const [openVacancyDialog, setOpenVacancyDialog] = React.useState(false);
  const [vacancies, setVacancies] = React.useState<any>(null); 
  const dispatch = useDispatch();
  
  const getVacancies = async() => {
    await dispatch(startLoadingAction());
    const fetchedData = await getOwnVacanciesFetch(props.token);
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
        <Link component='button' onClick={()=>setOpenVacancyDialog(true)}>Добавить вакансию</Link>
      </Grid>
      <Divider/>
      <Tape
        posts = {
          vacancies && vacanciesToPostList(vacancies)
        }
      />
    </>)
}

export const VacancyTab = connect(mapStateToProps)(VacancyTabComp);
  