import * as types from '../../constants/action-types';

interface IDialogState {
    isLoading: boolean
}

const initialState : IDialogState = {
    isLoading: false,
};

export default function dialogReducer(state = initialState, action) : IDialogState {
    switch (action.type) {
        case types.START_LOADING:
            return {
                isLoading: true,
            }
        case types.STOP_LOADING:
            return {
                isLoading: false,
            };
        default:
        return state;
    }
}