// Reducer.js

import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
} from './ActionType';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const adminLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case ADMIN_LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
