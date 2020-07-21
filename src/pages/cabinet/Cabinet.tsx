import * as React from 'react';
import { HCenterizingGrid } from './../grid-containers/HCenterizingGrid';
import { JobSeekerCabinet } from './job-seeker/JobSeekerCabinet';
import { AppMenuDivider } from '../grid-containers/AppMenuDivider';
import AccountInfo from '../../components/cards/AccountInfo';
import { RedirectIfNotAuthorized } from './../../components/redirects/RedirectIfNotAuthorized';
import { Tape } from '../../components/cards/tape/Tape';
import { IPostData } from './../../components/cards/tape/PostCard';
import { Grid } from '@material-ui/core';
import { getJobSeekerFetch } from '../../utils/fetchFunctions';
import { RootState } from '../../redux/store';
import { connect } from 'http2';
import { EmployeeCabinet } from './employee/EmployeeCabinet';
import { EmployerCabinet } from './employer/EmployerCabinet';
import { InstitutionCabinet } from './institution/InstitutionCabinet';

interface ICabinetProps {
    role: string
}

const testPosts: Array<IPostData> = [
    {
      title: "Пост о себе",
      body: "Я прекрасен, завидуйте молча. Сами вы уроды!",
      owner: "Прекрасный"
    }
]

function mapStateToProps(state : RootState) {
    return {
        role: state.authReducer.entityType,
    }
}

export const Cabinet = (props : ICabinetProps) => {
    React.useEffect(() => {

    })
        

    return (
        <HCenterizingGrid>
            {/*<InstitutionCabinet/>*/}
            {/*<EmployerCabinet/>*/}
            {/*<EmployeeCabinet/>*/}
            <JobSeekerCabinet/>
        </HCenterizingGrid>
        )
}

//export default connect(mapStateToProps)(CabinetComp);