import * as React from 'react';
import { HCenterizingGrid } from './../grid-containers/HCenterizingGrid';
import { JobSeekerCabinet } from './job-seeker/JobSeekerCabinet';
import { AppMenuDivider } from '../grid-containers/AppMenuDivider';
import AccountInfo from '../../components/cards/AccountInfo';
import { RedirectIfNotAuthorized } from './../../components/redirects/RedirectIfNotAuthorized';
import { Tape } from '../../components/cards/tape/Tape';
import { IPostData } from './../../components/cards/tape/PostCard';
import { Grid } from '@material-ui/core';
import { getPersonalDataFetch } from '../../utils/fetchFunctions';
import { RootState } from '../../redux/store';

import { EmployeeCabinet } from './employee/EmployeeCabinet';
import { EmployerCabinet } from './employer/EmployerCabinet';
import { InstitutionCabinet } from './institution/InstitutionCabinet';
import { connect } from 'react-redux';
import { AccountCommonInfo } from './../../components/cabinet/AccountCommonInfo';
import { PaddingPaper } from './../../components/cards/PaddingPaper';

interface ICabinetProps {
    role?: string | null
}

const testPosts: Array<IPostData> = [
    {
      title: "Пост о себе",
      body: "Я прекрасен, завидуйте молча. Сами вы уроды!",
      owner: "Прекрасный",
      createdAt: "2019-21-21",
    }
]

function mapStateToProps(state : RootState) {
    return {
        role: state.authReducer.entityType,
    }
}

const CabinetComp = (props : ICabinetProps) => {
    React.useEffect(() => {

    })
        

    return (
        <HCenterizingGrid>
            <RedirectIfNotAuthorized/>
            {props.role == 'ROLE_INSTITUTION' && <InstitutionCabinet/>}
            {props.role == 'ROLE_EMPLOYER' && <EmployerCabinet/>}
            {props.role == 'ROLE_EMPLOYEE' && <EmployeeCabinet/>}
            {props.role == 'ROLE_JOBSEEKER' && <JobSeekerCabinet/>}
            
        </HCenterizingGrid>
        )
}

export const Cabinet = connect(mapStateToProps)(CabinetComp);