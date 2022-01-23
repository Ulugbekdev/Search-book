import {createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import loginReducer from './loginReducer';
import searchReducer from './searchReducer';

const reducers = combineReducers({
    loginPage: loginReducer,
    searchPage: searchReducer
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));