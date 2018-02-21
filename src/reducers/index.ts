import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import main, { MainState } from './main';

export type RootState = {
  readonly main: MainState;
};

export default combineReducers<RootState>({
  routing: routerReducer,
  main,
});
