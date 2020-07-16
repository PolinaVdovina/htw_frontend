import { combineReducers, createStore, applyMiddleware } from 'redux';
import {authReducer} from './reducers/auth-reducers';
import {dialogReducer} from './reducers/dialog-reducers';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

export const reducer = combineReducers({
    authReducer,
    dialogReducer,
});

export type RootState = ReturnType<typeof reducer>

export const store = createStore(reducer, composeWithDevTools( applyMiddleware(thunk) ));