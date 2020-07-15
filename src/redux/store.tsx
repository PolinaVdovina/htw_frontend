import { combineReducers, createStore, applyMiddleware } from 'redux';
import authReducer from './reducers/auth';
import dialogReducer from './reducers/dialog-reducers';
import thunk from 'redux-thunk'

export const reducer = combineReducers({
    authReducer,
    dialogReducer,
});

export type RootState = ReturnType<typeof reducer>

export const store = createStore(reducer, applyMiddleware(thunk));