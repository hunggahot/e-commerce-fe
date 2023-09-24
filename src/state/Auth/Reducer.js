import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GOOGLE_SIGNIN_FAILURE,
  GOOGLE_SIGNIN_REQUEST,
  GOOGLE_SIGNIN_SUCCESS,
  GOOGLE_SIGN_OUT,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_SUCCESS,
} from './ActionType';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  googleSignInLoading: false,
  googleSignInError: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, isLoading: true, error: null };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, error: null, jwt: action.payload };
    case GET_USER_SUCCESS:
      return { ...state, isLoading: false, error: null, user: action.payload };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case GOOGLE_SIGNIN_REQUEST:
      return { ...state, googleSignInLoading: true, googleSignInError: null };
    case GOOGLE_SIGNIN_SUCCESS:
      return {
        ...state,
        googleSignInLoading: false,
        googleSignInError: null,
        jwt: action.payload,
      };
    case GOOGLE_SIGNIN_FAILURE:
      return {
        ...state,
        googleSignInLoading: false,
        googleSignInError: action.payload,
      };

    case LOGOUT:
      return { ...initialState };

    case GOOGLE_SIGN_OUT:
      return { ...initialState };

    case UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload, // Update the user's profile data
        loading: false,
        error: null,
      };

    case UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Store the error message
      };

    default:
      return state;
  }
};
