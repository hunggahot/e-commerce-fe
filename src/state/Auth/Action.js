import { api } from '../../config/apiConfig';
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

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());

  try {
    const response = await api.post(`/auth/signup`, userData);
    const user = response.data;

    if (user.jwt) {
      localStorage.setItem('jwt', user.jwt);
    }
    console.log('user ', user);
    dispatch(registerSuccess(user.jwt));
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await api.post(`/auth/signin`, userData);
    const user = response.data;

    if (user.jwt) {
      localStorage.setItem('jwt', user.jwt);
    }
    console.log('user ', user);
    dispatch(loginSuccess(user.jwt));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());

  try {
    const response = await api.get(`/api/v1/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (user.jwt) {
      localStorage.setItem('jwt', user.jwt);
    }
    const user = response.data;
    console.log('user ', user);
    dispatch(getUserSuccess(user.jwt));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

const updateUserProfileRequest = () => ({ type: UPDATE_USER_PROFILE_REQUEST });
const updateUserProfileSuccess = (user) => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
  payload: user,
});
const updateUserProfileFailure = (error) => ({
  type: UPDATE_USER_PROFILE_FAILURE,
  payload: error,
});

export const updateUserProfile = (jwt, updatedUserData) => async (dispatch) => {
  dispatch(updateUserProfileRequest());

  try {
    const response = await api.put(`/api/v1/users/profile`, updatedUserData, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const updatedUser = response.data;
    dispatch(updateUserProfileSuccess(updatedUser));
  } catch (error) {
    dispatch(updateUserProfileFailure(error.message));
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });
  localStorage.clear();
};

const googleSignInRequest = () => ({ type: GOOGLE_SIGNIN_REQUEST });
const googleSignInSuccess = (user) => ({
  type: GOOGLE_SIGNIN_SUCCESS,
  payload: user,
});
const googleSignInFailure = (error) => ({
  type: GOOGLE_SIGNIN_FAILURE,
  payload: error,
});

export const googleSignIn = () => async (dispatch) => {
  dispatch(googleSignInRequest());

  try {
    const auth2 = window.gapi.auth2.getAuthInstance();
    const googleUser = await auth2.signIn();

    const idToken = googleUser.getAuthInstance().id_token;

    const response = await api.post(`/auth/oauth2signin`);

    const user = response.data;

    if (user.jwt) {
      localStorage.setItem('jwt', user.jwt);
    }

    dispatch(googleSignInSuccess(user.jwt));
  } catch (error) {
    dispatch(googleSignInFailure(error.message));
  }
};

export const googleSignOut = () => (dispatch) => {
  dispatch({ type: GOOGLE_SIGN_OUT });
  localStorage.clear();
};
