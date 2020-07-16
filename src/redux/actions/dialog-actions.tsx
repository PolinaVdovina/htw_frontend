import { types } from "util";
import { START_LOADING, STOP_LOADING } from './../../constants/action-types';

export function startLoadingAction() {
    return {
      type: START_LOADING,
    };
  }
  

export function stopLoadingAction() {
    return {
      type: STOP_LOADING,
    };
}
  