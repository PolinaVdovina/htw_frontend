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
import {ITapeElementData} from "../../components/tape/posts/TapeElement";
import {useState} from "react";
import {vacancyToPost} from "../../utils/tape-converters/vacancy-to-tape-element";
import {Link as RouterLink} from "react-router-dom";
import {urls} from "../urls";
import {RespondButton} from "../../components/cabinet/jobseeker/RespondButton";
import {showChat} from "../../redux/reducers/chat-reducers";
import { IVacancy } from './../../utils/tape-converters/vacancy-to-tape-element';

interface IVacancyView {
    token?,
    userRole?: string | null,
}

const VacancyViewComp = (props: IVacancyView) => {
    const params: {id?: string | undefined} = useParams();
    const snackbar = useSnackbar();
    const [vacancyData, setVacancyData] = useState<ITapeElementData>()
    const [vacancyRawData, setVacancyRawData] = useState<IVacancy>()

    
    React.useEffect(() => {
        const getVacancy = async () => {
            const fetchResult = await getOneVacancyFetch(props.token, params.id);
            if (fetchResult.msgStatus === MessageStatus.OK) {
                setVacancyData(vacancyToPost(fetchResult.result))
                setVacancyRawData(fetchResult.result)
            }
            else {
                snackbar.enqueueSnackbar("Ошибка! Вакансия не может быть загружена", {variant: 'error'})
            }
        }
        getVacancy();
    }, [])

    return(
        <HCenterizingGrid>
            <Paper style={{ flexGrow: 1, overflow: "hidden" }}>
                <Grid container direction="column" style={{ height: "100%" }}>
                    <Grid item container alignItems="center" direction="row" style={{ padding: theme.spacing(1), paddingLeft: theme.spacing(2), }}>
                    <Typography variant="h6" style={{ flexGrow: 1, width: "min-content" }}>
                        Вакансия "{(vacancyRawData && vacancyRawData.position) ? vacancyRawData.position : null }"
                    </Typography>
                    { props.userRole == "ROLE_JOBSEEKER" && vacancyData &&
                        <Grid item>
                            <RespondButton id={vacancyData.id} token={props.token}></RespondButton>
                        </Grid>
                    }
                    </Grid>
                    {vacancyData && vacancyRawData && vacancyRawData.employerName && vacancyData.ownerLogin &&
                    <Typography
                        style={{ padding: theme.spacing(1), paddingLeft: theme.spacing(2)}}
                    >
                        Работодатель: <RouterLink
                            to={urls.cabinet.shortPath + vacancyData.ownerLogin}
                        >
                            {vacancyRawData.employerName}
                        </RouterLink>
                    </Typography>
                    }
                    <Divider/>
                    { vacancyData &&
                    <div style={{marginTop: theme.spacing(2)}}>

                        {vacancyData.body?.map(
                            (el, index) => <>
                                <el.Component key={index} data={el.data}/>
                                {index + 1 != vacancyData.body?.length && <br/>}
                            </>
                        )}
                    </div>
                    }
                </Grid>
            </Paper>
        </HCenterizingGrid>
    )
}

export const VacancyView = connect((state: RootState) => ({
    token: state.authReducer.token,
    userRole: state.authReducer.entityType,
}))(VacancyViewComp)