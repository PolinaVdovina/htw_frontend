import * as React from 'react';
import { RegCard } from '../../components/auth-reg/RegCard';
import { VHCenterizingGrid } from './../grid-containers/VHCenterizingGrid';
import { RedirectIfAuthorized } from './../../components/redirects/RedirectIfAuthorized';
import { HCenterizingGrid } from './../grid-containers/HCenterizingGrid';
import { Tape } from '../../components/tape/Tape';
import { Paper, Typography, Divider, Grid, IconButton, useTheme, Button, Tooltip } from '@material-ui/core';
import { useParams, useRouteMatch } from 'react-router';
import FilterListIcon from '@material-ui/icons/FilterList';
import { FilterForm } from './../../components/search/FilterForm';
import { TapeWithFetcher } from './../../components/tape/TapeWithFetcher';
import { vacancyToPost } from './../../utils/tape-converters/vacancy-to-tape-element';
import { vacancySettings } from '../../components/search/settings/vacancy-settings';
import { FilterContext, IFilterContextValue } from '../../components/search/FilterContext';
import { ISearchCriteria } from './../../utils/search-criteria/types';
import { searchCriteria } from './../../utils/search-criteria/builders';
import { TapeFetcherContext } from '../../components/tape/TapeFetcherContext';
import { jobSeekerSettings } from './../../components/search/settings/jobseeker-settings';
import { userToPost } from '../../utils/tape-converters/user-to-tape-element';
import { v4 as uuidv4 } from 'uuid';
import { employerSettings } from './../../components/search/settings/employer-settings';
import { institutionSettings } from './../../components/search/settings/institution-settings';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { userToPostResume } from '../../utils/tape-converters/user-to-tape-resume-element';

interface ISearchProps {
    userRole: any
}

const titles = {
    jobseeker: "Соискатели",
    vacancy: "Вакансии",
    employer: "Работодатели",
    institution: "Образовательные учреждения"
}

const urls = {
    jobseeker: "/personal/getBySearchCriteria",
    vacancy: "/vacancy/getBySearchCriteria",
    employer: "/employer/getBySearchCriteria",
    institution: "/institution/getBySearchCriteria"
}

const convertersToPost = {
    jobseeker: userToPostResume,
    vacancy: vacancyToPost,
    employer: userToPost,
    institution: userToPost
}

const settings = {
    jobseeker: jobSeekerSettings,
    vacancy: vacancySettings,
    employer: employerSettings,
    institution: institutionSettings
}

const mapStateToProps = (state: RootState) => ({
    userRole: state.authReducer.entityType
})

const SearchComp = (props: ISearchProps) => {
    const routeMatch = useRouteMatch();
    const entityType = routeMatch.params["entity"];
    const title = titles[entityType];
    return <SearchWrap {...props} key = {entityType} userRole={props.userRole}/>
}

export const Search = connect(mapStateToProps)(SearchComp)

const SearchWrap = (props: ISearchProps) => {
    const routeMatch = useRouteMatch();
    const entityType = routeMatch.params["entity"];
    const title = titles[entityType];
    const theme = useTheme();
    const [openFilterDrawer, setOpenFilterDrawer] = React.useState(false);
    let [searchCriteria, setSearchCriteria] = React.useState<Array<ISearchCriteria> | null>(null);
    const openFilterDrawerHandler = () => setOpenFilterDrawer(true);
    const closeFilterDrawerHandler = () => setOpenFilterDrawer(false);
    const tapeFetcherContext = React.useContext(TapeFetcherContext);
    const [sessionUID, setSessionUID] = React.useState(uuidv4());
    const filterContextValue: IFilterContextValue = {
        searchCriteria,
        setSearchCriteria,
    }

    return (
        <HCenterizingGrid >
            <FilterContext.Provider value={filterContextValue}>
                <FilterForm settings={settings[entityType]} open={openFilterDrawer} onClose={closeFilterDrawerHandler} />
                <Paper style={{ flexGrow: 1, overflow: "hidden" }}>
                    <Grid container direction="column" style={{ height: "100%" }}>
                        <Grid item container alignItems="center" direction="row" style={{ padding: theme.spacing(1), paddingLeft: theme.spacing(2), }}>
                            <Typography variant="h6" style={{ flexGrow: 1, width: "min-content" }}>
                                {title}
                            </Typography>

                                <Button
                                    onClick={openFilterDrawerHandler}
                                    style={{
                                        backgroundColor:
                                            theme.palette.primary.main,
                                        color: "white",
                                        /* borderRadius:0 */
                                    }}>
                                    Фильтры
                                </Button>

                        </Grid>
                        <Divider />

                        <TapeWithFetcher
                            sortKey="createdDate"
                            isRespondActive={(props.userRole == 'ROLE_JOBSEEKER' && entityType == "vacancy") ? true : false}
                            additionalSearchCriteria={searchCriteria}
                            rightText="4"
                            dataConverterFunction={convertersToPost[entityType]}
                            url={urls[entityType]} 
                            isActiveNeed={entityType == "vacancy" ? true : false}/>
                    </Grid>
                </Paper>
            </FilterContext.Provider>
        </HCenterizingGrid>
    )
}

