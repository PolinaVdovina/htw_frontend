import { useTheme, Grid, Link, Divider, Dialog, DialogTitle, DialogActions, Button } from "@material-ui/core";
import React from "react";
import { VacancyEditorDialog } from "../../vacancy-editor/VacancyEditorDialog";
import { Tape } from "../../tape/Tape";
import { RootState } from "../../../redux/store";
import { connect, useDispatch } from 'react-redux';
import { getOwnVacanciesFetch, removeVacancyFetch, getVacanciesByLoginAndMinDateFetch } from "../../../utils/fetchFunctions";
import { startLoadingAction, stopLoadingAction } from "../../../redux/actions/dialog-actions";
import { CabinetContext } from '../cabinet-context';
import { getVacanciesByLoginFetch } from '../../../utils/fetchFunctions';
import { MessageStatus } from "../../../utils/fetchInterfaces";
import { useSnackbar } from 'notistack';
import AddEntityBlock from "../AddEntityBlock";
//import { TapeFetcher } from '../../tape/TapeFetcher_OLD';
import { vacancyToPost } from "../../../utils/tape-converters/vacancy-to-tape-element";
import { v4 as uuidv4 } from 'uuid';
import { TapeFetcherProvider, TapeFetcherContext } from '../../tape/TapeFetcherContext';

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
  const cabinetContext = React.useContext(CabinetContext);
  const tapeFetcherContext = React.useContext(TapeFetcherContext);

  const snackbar = useSnackbar();
  const getNextVacancies = async() => {
    tapeFetcherContext && await tapeFetcherContext.fetchNext(
      (lastPostDate, dataCount) => getVacanciesByLoginAndMinDateFetch(props.token, cabinetContext.login, lastPostDate, dataCount),
      vacancyToPost
    );
  }
  
  React.useEffect(() => {
    getNextVacancies();    
  }, [])
  //alert(vacancies)
  const onDeleteVacancy = async() => {
    //alert(deletingId)
    dispatch(startLoadingAction());
    const result = await removeVacancyFetch(props.token, deletingId);
    if(result == MessageStatus.OK) {
      //await getNextVacancies();
      snackbar.enqueueSnackbar("Вакансия успешно удалена", {variant:"success"});
      tapeFetcherContext && tapeFetcherContext.tapeElements && tapeFetcherContext.setTapeElements( tapeFetcherContext.tapeElements.filter( el => el.id != deletingId) );
    }
    else
      snackbar.enqueueSnackbar("Не удалось удалить вакансию", {variant:"error"});
    
    setDeletingId(null);
    dispatch(stopLoadingAction());
  }

  return (
    <TapeFetcherProvider>
      {cabinetContext.isMine && 
      <>
      
        <Grid container direction="row-reverse"  style={{padding: theme.spacing(2)}}>
          <VacancyEditorDialog
          onClose={() => setOpenVacancyDialog(false)} 
          onSubmitSuccess={async() => {
            await dispatch(startLoadingAction());
            
            
            //await tapeFetcherContext?.setTapeElements(null);
            await tapeFetcherContext?.reset();
            alert("hhh")
            alert(JSON.stringify(tapeFetcherContext?.tapeElements))
            alert(JSON.stringify(tapeFetcherContext?.tapeElements))
            await getNextVacancies();
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
          //dataFetchFunction = {(lastPostDate, dataCount) => getVacanciesByLoginAndMinDateFetch(props.token, cabinetContext.login, lastPostDate, dataCount)}
          //dataConverterFunction = {vacancyToPost}
          onDeleteClick={cabinetContext.isMine ? (id) => setDeletingId(id) : null}
          elements = {
            tapeFetcherContext?.tapeElements
          }
        />
        <Grid item style = {{flexGrow:1}}>
          <Button variant="contained" color="primary" fullWidth onClick={getNextVacancies} style={{borderTopLeftRadius: 0, borderTopRightRadius:0}}>Дальше</Button>
        </Grid>
    </TapeFetcherProvider>)
}

export const VacancyTab = connect(mapStateToProps)(VacancyTabComp);
  