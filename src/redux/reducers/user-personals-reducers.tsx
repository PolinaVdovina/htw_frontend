import * as types from '../../constants/action-types';

interface ICommonState {
    isFetched,
    name?,
    surname?,
    middlename?,
    dateBirth?,
    phone?,
    email?
}

const initialState : ICommonState = {
    isFetched: false,
    name: null,
    surname: null,
    middlename: null,
    dateBirth: null,
    phone: null,
    email: null
};

export function userPersonalsReducer(state = initialState, action) : ICommonState {
    switch (action.type) {
        case types.FILL_JOBSEEKER_DATA:
            return {
                ...state,
                ...action.data,
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
