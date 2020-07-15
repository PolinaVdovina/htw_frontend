import * as types from '../../constants/action-types';
import { startLoading as startLoadingAction } from './../actions/dialog-actions';

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

export const startLoading: () => void = () => async (dispatch, getState) => {
    dispatch(startLoadingAction);
} 