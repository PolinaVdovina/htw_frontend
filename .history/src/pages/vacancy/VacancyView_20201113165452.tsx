import { Paper, Grid, Typography, Divider } from '@material-ui/core'
import { connect } from 'react-redux'
import * as React from 'react'
import { useParams } from 'react-router'
import { RootState } from '../../redux/store'
import { theme } from '../../theme'
import { getOneVacancyFetch } from '../../utils/fetchFunctions'
import { HCenterizingGrid } from '../grid-containers/HCenterizingGrid'
import { MessageStatus } from '../../utils/fetchInterfaces'
import { useSnackbar } from 'notistack'

interface IVacancyView {
    token?
}

const VacancyViewComp = (props: IVacancyView) => {
    const params: {id?: string | undefined} = useParams();
    const snackbar = useSnackbar();

    React.useEffect(() => {
        async function getVacancy() {
            const fetchResult = await getOneVacancyFetch(props.token, params.id);
            if (fetchResult.msgStatus === MessageStatus.OK) {
                alert(JSON.stringify(fetchResult.result))
            }
            else {
                snackbar.enqueueSnackbar("Ошибка! Вакансия не может быть загружена", {variant: 'error'})
            }
        }
    }, [])

    return(
        <HCenterizingGrid>
            <Paper style={{ flexGrow: 1, overflow: "hidden" }}>
                <Grid container direction="column" style={{ height: "100%" }}>
                    <Grid item container alignItems="center" direction="row" style={{ padding: theme.spacing(1), paddingLeft: theme.spacing(2), }}>
                    <Typography variant="h6" style={{ flexGrow: 1, width: "min-content" }}>
                        Вакансия
                    </Typography>
                    <Divider/>
                    </Grid>
                </Grid>
            </Paper>
        </HCenterizingGrid>
    )
}

export const VacancyView = connect((state: RootState) => {return {token: state.authReducer.token}})(VacancyViewComp)