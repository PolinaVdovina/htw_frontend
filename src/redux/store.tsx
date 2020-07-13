import { combineReducers, createStore } from 'redux';
import authReducer from './reducers/auth';
import dialogReducer from './reducers/dialog-reducers';

export const reducer = combineReducers({
    authReducer,
    dialogReducer,
});

export type RootState = ReturnType<typeof reducer>

export const store = createStore(reducer);