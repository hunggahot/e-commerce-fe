import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
} from './ActionType';

const initialState = {
  users: [], // Store the list of users
  isLoading: false,
  error: null,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };

    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default customerReducer;
