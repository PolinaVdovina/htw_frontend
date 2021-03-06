import React from "react";
import { connect, useDispatch } from 'react-redux';
import { RootState } from "../../../redux/store";
import { useTheme, Grid, Dialog, DialogTitle, DialogActions, Button, Divider } from "@material-ui/core";
import { CabinetContext } from "../cabinet-context";
import { TapeFetcherContext } from "../../tape/TapeFetcherContext";
import { useSnackbar } from "notistack";
import { searchCriteria, sortCriteria, pagination } from "../../../utils/search-criteria/builders";
import { SearchCriteriaOperation, SortCriteriaDirection } from "../../../utils/search-criteria/types";
import { searchCriteriaFetch, removeVacancyFetch, removeAchievFetch } from "../../../utils/fetchFunctions";
import { startLoadingAction, stopLoadingAction } from "../../../redux/actions/dialog-actions";
import { MessageStatus } from "../../../utils/fetchInterfaces";
import AddEntityBlock from "../AddEntityBlock";
import { Tape } from "../../tape/Tape";
import { NewAchievementDialog } from "./NewAchievementDialog";


function mapStateToProps(state: RootState) {
  return {
    token: state.authReducer.token,
  }
}

const AchievementTabComp = (props) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const snackbar = useSnackbar();
	const cabinetContext = React.useContext(CabinetContext);
	const tapeFetcherContext = React.useContext(TapeFetcherContext);
	const [openDialog, setOpenDialog] = React.useState(false);
	const [deletingId, setDeletingId] = React.useState<any>(null);
	const [isOver, setOver] = React.useState(false);
	const getNextAchievements = async () => {
		// const lastPostDate = (tapeFetcherContext?.tapeElements && tapeFetcherContext?.tapeElements?.length > 0) ? 
		// 	tapeFetcherContext?.tapeElements[tapeFetcherContext.tapeElements.length-1].createdDate 
		// 	: null
		// const additionSearchCriteria = lastPostDate ? [searchCriteria("createdDate", lastPostDate, SearchCriteriaOperation.LESS)] : [];
		const r = await tapeFetcherContext?.fetchNext(
		async(lastPostDate, count) => {
			
			const fetch = await searchCriteriaFetch("/personal/achievements/getBySearchCriteria", props.token,
			{
				searchCriteria: [
					searchCriteria("createdDate", lastPostDate, SearchCriteriaOperation.LESS),
					searchCriteria("jobSeekerLogin", cabinetContext.login, SearchCriteriaOperation.EQUAL)
				],
				sortCriteria: [sortCriteria("createdDate", SortCriteriaDirection.DESC)],
				pagination: pagination(5)
			});
			if(fetch && fetch.msgInfo && fetch.msgInfo.msgStatus==MessageStatus.OK )
				if(fetch.result && fetch.result?.length < 5)
					setOver(true);
				else setOver(false);
			return fetch;
		});

		
	}

	React.useEffect(() => {
		getNextAchievements();
	}, [])

	const onDeleteAchievement = async () => {
		dispatch(startLoadingAction());

		const result = await removeAchievFetch(props.token, deletingId);
		if (result == MessageStatus.OK) {
			snackbar.enqueueSnackbar("Достижение удалено", { variant: "success" });
			tapeFetcherContext?.reset();
			await getNextAchievements();
		}
		else
			snackbar.enqueueSnackbar("Не удалось удалить достижение", { variant: "error" });

		setDeletingId(null);
		dispatch(stopLoadingAction());
	}

	const onSubmit = async () => {
		await dispatch(startLoadingAction());
		tapeFetcherContext?.reset();
		await getNextAchievements();
		await dispatch(stopLoadingAction());
		await setOpenDialog(false);
	}

	return (
		<div>
			{cabinetContext.isMine && <>
				<Grid container direction="row-reverse" style={{ padding: theme.spacing(2) }}>
					<NewAchievementDialog
						onClose={() => setOpenDialog(false)}
						onSubmitSuccess={() => onSubmit()}							
						open={openDialog} 
						token={props.token}
					/>
					<Dialog
						onClose={() => setDeletingId(null)}
						open={deletingId != null}
					>
						<DialogTitle>Вы точно хотите удалить достижение?</DialogTitle>
						<DialogActions>
							<Button onClick={onDeleteAchievement}>
								Да
							</Button>
							<Button onClick={() => setDeletingId(null)}>
								Нет
							</Button>
						</DialogActions>
					</Dialog>
					<AddEntityBlock handleClickOpen={() => setOpenDialog(true)} />
				</Grid>
				<Divider />
			</>}
			<Tape
				onDeleteClick={cabinetContext.isMine ? (id) => setDeletingId(id) : null}
				isRespondActive={false}
				isRespondViewActive={false}
				elements={tapeFetcherContext?.tapeElements}			
			/>
			<Grid item style={{ flexGrow: 1 }}>
				<Button 
					disabled={isOver}
					variant="contained" 
					color="primary" 
					fullWidth 
					onClick={getNextAchievements} 
					style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
				>
					{isOver ? "Лента закончена" : "Дальше"}
				</Button>
			</Grid>
		</div>
	)
}

export const AchievementTab = connect(mapStateToProps)(AchievementTabComp);