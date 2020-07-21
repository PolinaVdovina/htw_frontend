import * as types from '../../constants/action-types';

interface ICommonState {
    name?,
    surname?,
    middlename?,
}

const initialState : ICommonState = {
    name: null,
    surname: null,
    middlename: null,
};

export function userPersonalsReducer(state = initialState, action) : ICommonState {
    switch (action.type) {
        case types.GET_JOBSEEKER_DATA:
            return {
              name: action.name,
              surname: action.surname,
              middlename: action.middlename,
            }
        default:
        return state;
    }
}
