import * as React from 'react';
import { HCenterizingGrid } from './../grid-containers/HCenterizingGrid';
import { JobSeekerCabinet } from './job-seeker/JobSeekerCabinet';
import { AppMenuDivider } from '../grid-containers/AppMenuDivider';
import AccountInfo from '../../components/cards/AccountInfo';
import { RedirectIfNotAuthorized } from './../../components/redirects/RedirectIfNotAuthorized';
import { Tape } from '../../components/tape/Tape';
import { IPostData } from '../../components/tape/posts/PostCard';
import { Grid } from '@material-ui/core';
import { getPersonalDataFetch } from '../../utils/fetchFunctions';
import { RootState } from '../../redux/store';

import { EmployeeCabinet } from './employee/EmployeeCabinet';
import { EmployerCabinet } from './employer/EmployerCabinet';
import { InstitutionCabinet } from './institution/InstitutionCabinet';
import { connect } from 'react-redux';
import { AccountCommonInfo } from './../../components/cabinet/AccountCommonInfo';
import { PaddingPaper } from './../../components/cards/PaddingPaper';
import { useRouteMatch } from 'react-router';
import { getAccountDataFetch } from './../../utils/fetchFunctions';
import { accountRequestToEntityDictionary } from '../../utils/appliedFunc';
import { CabinetContext } from '../../components/cabinet/cabinet-context';
import { authReducer } from '../../redux/reducers/auth-reducers';

interface ICabinetProps {
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
    }
}


function mapStateToProps(state : RootState) {
    let data =  {
        myLogin: state.authReducer.login,
        myToken: state.authReducer.token,
        reduxPersonalData: { 
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
            competenceSet: state.userPersonalsReducer.competenceSet
        }
    }
    // data.reduxPersonalData['name'] = '';
    // if(state.userPersonalsReducer.name)
    //     data.reduxPersonalData['name'] += state.userPersonalsReducer.name + " ";
    // if(state.userPersonalsReducer.surname)
    //     data.reduxPersonalData['name'] += state.userPersonalsReducer.surname + " ";
    // if(state.userPersonalsReducer.middlename)
    //     data.reduxPersonalData['name'] += state.userPersonalsReducer.middlename;
        
    return data;
    
}




const CabinetComp = (props : ICabinetProps) => {
    React.useEffect(() => {

    })

    const routeMatch = useRouteMatch();
    const urlLogin = routeMatch.params['login'];
    
    const isMine = () => props.myLogin == urlLogin;
    const [cardData, setCardData] = React.useState<any>(null);
    React.useEffect(() => {
        const fetchData = async() => {
            if(props.myToken) {
                const requestData = await getAccountDataFetch(props.myToken, urlLogin);
                let field = ""
                switch(requestData.roles) {
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
                
                await setCardData({
                    ...parsedData,
                    role: requestData.roles,
                    isMine: false,
                })
            }
        }
        if(props.myLogin) {
            if(isMine()) {
                //alert(JSON.stringify(props.reduxPersonalData))
                setCardData({...props.reduxPersonalData, isMine:true});
                
            }
            else {
                
                fetchData();
            }
        }
      }, [isMine(), props.reduxPersonalData])
    //alert(JSON.stringify(props.reduxPersonalData));
    return (
        <HCenterizingGrid>
            <RedirectIfNotAuthorized/>
                <CabinetContext.Provider value={cardData}>
                    {cardData && cardData.role == 'ROLE_INSTITUTION' && <InstitutionCabinet {...cardData}/>}
                    {cardData && cardData.role == 'ROLE_EMPLOYER' && <EmployerCabinet {...cardData}/>}
                    {cardData && cardData.role == 'ROLE_EMPLOYEE' && <EmployeeCabinet {...cardData}/>}
                    {cardData && cardData.role == 'ROLE_JOBSEEKER' && <JobSeekerCabinet {...cardData}/>}   
                </CabinetContext.Provider>
        </HCenterizingGrid>
        )
}

export const Cabinet = connect(mapStateToProps)(CabinetComp);