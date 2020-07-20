import * as types from '../../constants/action-types';

interface ICommonState {
    name?,
    surname?,
    middlename?,
}

const initialState : ICommonState = {

};

export function dialogReducer(state = initialState, action) : ICommonState {
    switch (action.type) {
        case types.GET_JOBSEEKER_DATA:
            return {
              
            }
        default:
        return state;
    }
}