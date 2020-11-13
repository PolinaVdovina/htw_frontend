import { Paper, Grid, Typography, Divider } from '@material-ui/core'
import * as React from 'react'
import { useParams } from 'react-router'
import { theme } from '../../theme'
import { HCenterizingGrid } from '../grid-containers/HCenterizingGrid'

interface IVacancyView {

}

export const VacancyView = () => {
    

    React.useEffect(() => {
        const idVacancy = useParams();
        alert(idVacancy)
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
