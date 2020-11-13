import { Paper, Grid } from '@material-ui/core'
import * as React from 'react'
import { theme } from '../../theme'
import { HCenterizingGrid } from '../grid-containers/HCenterizingGrid'

export const VacancyView = () => {
    return(
        <HCenterizingGrid>
            <Paper style={{ flexGrow: 1, overflow: "hidden" }}>
                <Grid container direction="column" style={{ height: "100%" }}>
                    <Grid item container alignItems="center" direction="row" style={{ padding: theme.spacing(1), paddingLeft: theme.spacing(2), }}>
                        <p>woejhoiwuehoiuh</p>
                    </Grid>
                </Grid>
            </Paper>
        </HCenterizingGrid>
    )
}
