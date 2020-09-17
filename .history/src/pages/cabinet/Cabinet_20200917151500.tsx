import * as React from 'react';
import { HCenterizingGrid } from './../grid-containers/HCenterizingGrid';
import { JobSeekerCabinet } from './job-seeker/JobSeekerCabinet';
import { AppMenuDivider } from '../grid-containers/AppMenuDivider';
import AccountInfo from '../../components/cabinet/AccountInfo';
import { RedirectIfNotAuthorized } from './../../components/redirects/RedirectIfNotAuthorized';
import { Tape } from '../../components/tape/Tape';
import { ITapeElementData } from '../../components/tape/posts/TapeElement';
import { Grid } from '@material-ui/core';
import { getPersonalDataFetch } from '../../utils/fetchFunctions';
import { RootState } from '../../redux/store';

import { EmployeeCabinet } from './employee/EmployeeCabinet';
import { EmployerCabinet } from './employer/EmployerCabinet';
import { InstitutionCabinet } from './institution/InstitutionCabinet';
import { connect, useDispatch } from 'react-redux';
import { AccountCommonInfo } from './../../components/cabinet/AccountCommonInfo';
import { PaddingPaper } from './../../components/cards/PaddingPaper';
import { useRouteMatch } from 'react-router';
import { getAccountDataFetch } from './../../utils/fetchFunctions';
import { accountRequestToEntityDictionary } from '../../utils/appliedFunc';
import { CabinetContext } from '../../components/cabinet/cabinet-context';
import { authReducer } from '../../redux/reducers/auth-reducers';
import { startLoadingAction, stopLoadingAction } from './../../redux/actions/dialog-actions';
import { SubscriptionBlock } from '../../components/cabinet/SubscriptionBlock';
import { subscribeToOnlineTracking } from '../../websockets/chat/actions';
import { getWebSocket } from '../../websockets/common';
import { getStompClient } from './../../websockets/common';
import Stomp from 'stompjs';

interface ICabinetProps {
    isFetched: boolean,
    myLogin?: string | null,
    myToken?: string | null,
    reduxPersonalData: {
        role?: string | null,
        dateBirth,
        phone,
        email,
        address,
        inn,
        ogrn,
        gender,
        name,
        about,

    }
}

function mapStateToProps(state: RootState) {
    let data = {
        loggedIn: state.authReducer.authCompleteStatus,
        myLogin: state.authReducer.login,
        myToken: state.authReducer.token,
        reduxPersonalData: {
            subscriptionLogins: state.userPersonalsReducer.subscriptionLogins,
            role: state.authReducer.entityType,
            name: state.userPersonalsReducer.name,
            surname: state.userPersonalsReducer.surname,
            middlename: state.userPersonalsReducer.middlename,
            about: state.userPersonalsReducer.about,
            dateBirth: '' + state.userPersonalsReducer.dateBirth,
            phone: '' + state.userPersonalsReducer.phone,
            email: '' + state.userPersonalsReducer.email,
            address: state.userPersonalsReducer.address,
            inn: '' + state.userPersonalsReducer.inn,
            ogrn: '' + state.userPersonalsReducer.ogrn,
            gender: state.userPersonalsReducer.gender,
            types: state.userPersonalsReducer.types,
            experience: state.userPersonalsReducer.experience,
            competenceSet: state.userPersonalsReducer.competenceSet,
            employer: state.userPersonalsReducer.employer,
            links: state.userPersonalsReducer.links,
            jobApplicantSet: state.userPersonalsReducer.jobApplicantSet,
            education: state.userPersonalsReducer.education,
            industry: state.userPersonalsReducer.industry,
            status: state.userPersonalsReducer.status,
            employment: state.userPersonalsReducer.employment,
            vacancyTypes: state.userPersonalsReducer.vacancyTypes
        }
    }
    return data;

}




const CabinetComp = (props: ICabinetProps) => {
    const subscriptionRef = React.useRef<Stomp.Subscription | null>(null);
    const [isOnline, setOnline] = React.useState<boolean | null>(null);
    const routeMatch = useRouteMatch();
    const urlLogin = routeMatch.params['login'];
    const dispatch = useDispatch();
    const isMine = () => props.myLogin == urlLogin;
    const [cardData, setCardData] = React.useState<any>(null);

    React.useEffect(() => {

    }, []);


    React.useEffect(() => {
        const fetchData = async () => {
            if (props.myToken) {
                await dispatch(startLoadingAction());
                const requestData = await getAccountDataFetch(props.myToken, urlLogin);
                let field = ""
                switch (requestData.roles) {
                    case "ROLE_JOBSEEKER":
                        field = "jobseeker";
                        break;
                    case "ROLE_EMPLOYER":
                        field = "employer";
                        break;
                    case "ROLE_INSTITUTION":
                        field = "institution";
                        break;
                    case "ROLE_EMPLOYEE":
                        field = "employee";
                        break;
                }
                const parsedData = accountRequestToEntityDictionary(requestData[field], requestData.roles);

                //alert(JSON.stringify(requestData.roles))

                const onUserChangeOnlineStatus = (newStatus: boolean) => {
                    setOnline(newStatus)
                };
                const isOnline = parsedData?.isOnline;
                setOnline(parsedData?.isOnline);

                const subscription: Stomp.Subscription | undefined = subscribeToOnlineTracking(urlLogin, onUserChangeOnlineStatus);
                if(subscription)
                    subscriptionRef.current = subscription
                //alert(subscriptionRef.current)


                await setCardData({
                    ...parsedData,
                    role: requestData.roles,
                    login: urlLogin,
                    isMine: false,
                })
                await dispatch(stopLoadingAction());

            }
        }
        if (props.myLogin) {
            if (isMine()) {
                //alert(JSON.stringify(props.reduxPersonalData))
                setCardData({ ...props.reduxPersonalData, isMine: true, login: urlLogin });
                setOnline(true);
            }
            else {

                fetchData();
            }
        }

        return () => {
            const subscription = subscriptionRef.current;
            if(subscription)
                getStompClient()?.unsubscribe(subscription.id);
        }
    }, [...Object.keys(props.reduxPersonalData).map(key => props.reduxPersonalData[key]), isMine(), urlLogin])
    //alert(JSON.stringify(props.reduxPersonalData));
    return (
        <HCenterizingGrid>
            <RedirectIfNotAuthorized />
            <CabinetContext.Provider value={{...cardData, isOnline}}>
                {cardData && cardData.role == 'ROLE_INSTITUTION' && <InstitutionCabinet key={urlLogin} {...cardData} />}
                {cardData && cardData.role == 'ROLE_EMPLOYER' && <EmployerCabinet key={urlLogin} {...cardData} />}
                {cardData && cardData.role == 'ROLE_EMPLOYEE' && <EmployeeCabinet key={urlLogin} {...cardData} />}
                {cardData && cardData.role == 'ROLE_JOBSEEKER' && <JobSeekerCabinet key={urlLogin} {...cardData} />}
            </CabinetContext.Provider>
        </HCenterizingGrid>
    )
}

export const Cabinet = connect(mapStateToProps)(CabinetComp);