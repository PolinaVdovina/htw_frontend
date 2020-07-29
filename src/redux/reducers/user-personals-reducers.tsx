import * as types from '../../constants/action-types';
import { startLoadingAction, stopLoadingAction } from '../actions/dialog-actions';
import { getPersonalDataFetch, getEmployerFetch } from '../../utils/fetchFunctions';
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
    gender: null
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
    }
    dispatch(stopLoadingAction());

}