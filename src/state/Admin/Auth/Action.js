import axios from 'axios';
import { API_BASE_URL } from '../../../config/apiConfig';
import {
  ADMIN_LOGIN_FAILURE,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
} from './ActionType';

const loginRequest = () => ({ type: ADMIN_LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: ADMIN_LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: ADMIN_LOGIN_FAILURE, payload: error });

export const adminLogin = (userData) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;

    // Check if the user has the role "admin"
    if (user.roles && user.roles.some((role) => role.name === 'admin')) {
      if (user.jwt) {
        localStorage.setItem('jwt', user.jwt);
      }
      dispatch(loginSuccess(user.jwt));
    } else {
      // Handle the case where the user is not an admin
      dispatch(loginFailure('User is not an admin.'));
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
