import {
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,
} from './ActionType';
import { api } from '../../../config/apiConfig'; // Import the Axios instance you've created

// Action creators for getting all users
export const getAllUsersRequest = () => ({ type: GET_ALL_USERS_REQUEST });
export const getAllUsersSuccess = (users) => ({
  type: GET_ALL_USERS_SUCCESS,
  payload: users,
});
export const getAllUsersFailure = (error) => ({
  type: GET_ALL_USERS_FAILURE,
  payload: error,
});

// Thunk action to get all users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(getAllUsersRequest());

    // Make an API call to fetch users
    const response = await api.get('/api/v1/users/'); // Adjust the endpoint as needed
    const users = response.data; // Assuming your API returns the list of users

    dispatch(getAllUsersSuccess(users));
  } catch (error) {
    dispatch(getAllUsersFailure(error.message));
  }
};
