import * as types from '../../constants/action-types';
import { startLoadingAction, stopLoadingAction } from '../actions/dialog-actions';
import { getPersonalDataFetch, getEmployerFetch, getInstitutionFetch } from '../../utils/fetchFunctions';
import { addressGlue, genderIntToStr, accountRequestToEntityDictionary } from '../../utils/appliedFunc';
import { fillPersonalDataAction } from '../actions/user-personals';

interface ICommonState {
    isFetched,
    name?,
    surname?,
    middlename?,
    dateBirth?,
    phone?,
    email?,
    about?,
    address?,
    inn?,
    ogrn?,
    gender?,
    types?
}

const initialState : ICommonState = {
    isFetched: false,
    name: null,
    surname: null,
    middlename: null,
    dateBirth: null,
    phone: null,
    email: null,
    about: null,
    address: null,
    inn: null,
    ogrn: null,
    gender: null,
    types: null
};

export function userPersonalsReducer(state = initialState, action) : ICommonState {
    switch (action.type) {
        case types.FILL_PERSONAL_DATA:
            return {
                ...state,
                ...action.data,
                isFetched: true,
            }
        case types.FILL_JOBSEEKER_NAME: 
            return {
                ...state,
                name: action.name,
                surname: action.surname,
                middlename: action.middlename,
            }
        default:
        return state;
    }
}


export const getPersonalData: (token: string) => void = (token) => 
async (dispatch, getState) => {
    dispatch(startLoadingAction());
    const role = getState().authReducer.entityType;
    switch(role) {
        case ("ROLE_JOBSEEKER"):
            const jobSeekerData = await getPersonalDataFetch(getState().authReducer.token);
            let address = addressGlue(jobSeekerData.address);
            //(JSON.stringify(jobSeekerData.address))
            //alert(JSON.stringify(address));
            
            const jobSeekerDict = accountRequestToEntityDictionary(jobSeekerData, role);
            //alert(JSON.stringify(jobSeekerDict))
            await dispatch(fillPersonalDataAction(
                jobSeekerDict
            ));
            break;

        case ("ROLE_EMPLOYER"):
            const employerData = await getEmployerFetch(getState().authReducer.token);
            //let address1 = addressGlue(employerData.address);
            //alert(JSON.stringify(employerData))
            const employerDict = accountRequestToEntityDictionary(employerData, role);
            await dispatch(fillPersonalDataAction(
                employerDict
            ));
            break;
        case ("ROLE_INSTITUTION"):
            const institutionData = await getInstitutionFetch(getState().authReducer.token);
            //let address1 = addressGlue(employerData.address);
            //alert(JSON.stringify(institutionData))
            await dispatch(fillPersonalDataAction({
                name: institutionData.name, 
                phone: institutionData.phone, 
                email: institutionData.email,
                about: institutionData.about,
                address: institutionData.address,
                inn: institutionData.inn,
                ogrn: institutionData.ogrn,
                types: institutionData.types
            }));
            break;
    }
    dispatch(stopLoadingAction());

}