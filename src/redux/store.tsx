import { combineReducers, createStore, applyMiddleware } from 'redux';
import {authReducer} from './reducers/auth-reducers';
import {dialogReducer} from './reducers/dialog-reducers';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { userPersonalsReducer } from './reducers/user-personals-reducers';
import { entitiesReducer } from './reducers/entities-reducers';
import {snackBarReducer} from './reducers/snackbar-reducers'

export const reducer = combineReducers({
    authReducer,
    dialogReducer,
    userPersonalsReducer,
    snackBarReducer,
    entitiesReducer
});

export type RootState = ReturnType<typeof reducer>

export const store = createStore(reducer, composeWithDevTools( applyMiddleware(thunk) ));