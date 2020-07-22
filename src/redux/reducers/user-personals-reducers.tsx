import * as types from '../../constants/action-types';

interface ICommonState {
    name?,
    surname?,
    middlename?,
    dateBirth?,
    phone?,
    email?
}

const initialState : ICommonState = {
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
              name: action.name,
              surname: action.surname,
              middlename: action.middlename,
              dateBirth: action.dateBirth,
              phone: action.phone,
              email: action.email
            }
        default:
        return state;
    }
}
