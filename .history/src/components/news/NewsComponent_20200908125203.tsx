import * as React from 'react';
import { RegCard } from '../../components/auth-reg/RegCard';
import { RedirectIfAuthorized } from './../../components/redirects/RedirectIfAuthorized';
import { Tape } from '../../components/tape/Tape';
import { Paper, Typography, Divider, Grid, IconButton, useTheme, Button } from '@material-ui/core';
import { useParams, useRouteMatch } from 'react-router';
import FilterListIcon from '@material-ui/icons/FilterList';
import { FilterForm } from './../../components/search/FilterForm';
import { TapeWithFetcher } from './../../components/tape/TapeWithFetcher';
import { vacancyToPost } from './../../utils/tape-converters/vacancy-to-tape-element';
import { HCenterizingGrid } from '../../pages/grid-containers/HCenterizingGrid';
import { userToPost } from '../../utils/tape-converters/user-to-tape-element';
import { ChangeCompetences } from '../cabinet/changeMiniComponents/ChangeCompetences';
import { settingsCompetenceSet } from '../cabinet/changeMiniComponents/changeSettings';
import { vacancySettings } from './../search/settings/vacancy-settings';

interface INewsComponent {

}

const titles = {
    jobseeker: "Соискатели",
    vacancy: "Вакансии",
    employer: "Работодатели",
    institution: "Образовательные учреждения"
}

const urls = {
    //jobseeker: "/personal/getBySearchCriteria",
    vacancy: "/vacancy/get-from-subscribers",
    //employer: "/employer/getBySearchCriteria",
    institution: "/institution/get-students-for-subscribers"
}

const converterFunctions = {
    vacancy: vacancyToPost,
    institution: userToPost
}

const sortKeys = {
    vacancy: 'createdDate',
    institution: 'title'
} 


const employerSettings = {
    name: {
        operation: "LIKE"
    },
    position: {
        operation: "LIKE"
    }
}


export const NewsComponent = (props: INewsComponent) => {
    const routeMatch = useRouteMatch();
    const entityType = routeMatch.params["entity"];
    const title = titles[entityType];
    const theme = useTheme();
    const [openFilterDrawer, setOpenFilterDrawer] = React.useState(false);

    const openFilterDrawerHandler = () => setOpenFilterDrawer(true);
    const closeFilterDrawerHandler = () => setOpenFilterDrawer(false);

    return (
        <HCenterizingGrid >
            <FilterForm settings={vacancySettings} open={openFilterDrawer} onClose={closeFilterDrawerHandler} />
            <Paper style={{ flexGrow: 1, overflow: "hidden"}}>
                <Grid container direction="column" style={{ height: "100%"}}>
                    <Grid item container alignItems="center" direction="row" style={{ padding: theme.spacing(1), paddingLeft: theme.spacing(2), }}>
                        <Typography variant="h6" style={{ flexGrow: 1, width: "min-content" }}>
                            {title}
                        </Typography>
                        <IconButton
                            onClick={openFilterDrawerHandler}
                            style={{
                                width: "36px",
                                height: "36px",
                                backgroundColor:
                                    theme.palette.primary.main,
                                color: "white",
                                /* borderRadius:0 */
                            }}>
                            <FilterListIcon style={{ width: "auto" }} />
                        </IconButton>
                    </Grid>
                    <Divider />
                <TapeWithFetcher
                    isRespondActive={false} 
                    dataConverterFunction={converterFunctions[entityType]} 
                    url={urls[entityType]} 
                    sortKey={sortKeys[entityType]}
                />
                </Grid>

            </Paper>
        </HCenterizingGrid>
    )
}
