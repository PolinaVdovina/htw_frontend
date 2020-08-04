import * as types from '../../constants/action-types';
import { startLoadingAction, stopLoadingAction } from '../actions/dialog-actions';
import { getPersonalDataFetch, getEmployeesListFetch } from '../../utils/fetchFunctions';
import { accountRequestToEntityDictionary } from '../../utils/appliedFunc';
import { fillPersonalDataAction } from '../actions/user-personals';
import { fillEntityDataAction } from '../actions/entity-actions';

interface ICommonState {
    employees?
}

const initialState : ICommonState = {
    employees: []
};


export function entitiesReducer(state = initialState, action) : ICommonState {
    switch (action.type) {
        case types.FILL_BONDMANS:
            return {
                ...state,
                ...action.data,
                isFetched: true,
            }
        default:
            return state;
    }
}

export const getEmployeesData: (token: string) => void = (token) => 
async (dispatch, getState) => {
    dispatch(startLoadingAction());
    const role = getState().authReducer.entityType;
    switch (role) {
        case "ROLE_EMPLOYER":
            const employeesListData = await getEmployeesListFetch(getState().authReducer.token);  
            await dispatch(fillEntityDataAction({
                employees: employeesListData
            }));
    }

    const employeesListData = await getEmployeesListFetch(getState().authReducer.token);           

    await dispatch(fillEntityDataAction({
        employees: employeesListData
    }));    
            
    dispatch(stopLoadingAction());

}