import * as types from '../../constants/action-types';
import { startLoadingAction, stopLoadingAction } from '../actions/dialog-actions';
import { getPersonalDataFetch } from '../../utils/fetchFunctions';
import { accountRequestToEntityDictionary } from '../../utils/appliedFunc';
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
    types?,
    experience?,
    competenceSet?,
    employerName?,
    employerLogin?
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
    types: null,
    experience: null,
    competenceSet: null,
    employerName: null,
    employerLogin: null
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
            const jobSeekerData = await getPersonalDataFetch(getState().authReducer.token, 'personal');           
            const jobSeekerDict = accountRequestToEntityDictionary(jobSeekerData, role);
            await dispatch(fillPersonalDataAction(jobSeekerDict));           
            break;

        case ("ROLE_EMPLOYER"):
            const employerData = await getPersonalDataFetch(getState().authReducer.token, 'employer');
            const employerDict = accountRequestToEntityDictionary(employerData, role);
            await dispatch(fillPersonalDataAction(employerDict));            
            break;
            
        case ("ROLE_INSTITUTION"):
            const institutionData = await getPersonalDataFetch(getState().authReducer.token, 'institution');
            const institutionDict = accountRequestToEntityDictionary(institutionData, role);
            await dispatch(fillPersonalDataAction(institutionDict));
            break;

        case ("ROLE_EMPLOYEE"):
            const employeeData = await getPersonalDataFetch(getState().authReducer.token, 'employee');
            const employeeDict = accountRequestToEntityDictionary(employeeData, role);
            await dispatch(fillPersonalDataAction(employeeDict));
            break;
    }
    dispatch(stopLoadingAction());

}