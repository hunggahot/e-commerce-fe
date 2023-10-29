import { api } from '../../../config/apiConfig';

import {
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILURE,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILURE,
  EDIT_ROLE_REQUEST,
  EDIT_ROLE_SUCCESS,
  EDIT_ROLE_FAILURE,
  TOGGLE_ROLE_PERMISSION_REQUEST,
  TOGGLE_ROLE_PERMISSION_SUCCESS,
  TOGGLE_ROLE_PERMISSION_FAILURE,
  FIND_ROLE_BY_ID_REQUEST,
  FIND_ROLE_BY_ID_SUCCESS,
  FIND_ROLE_BY_ID_FAILURE,
} from './ActionType';

export const getRoles = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ROLES_REQUEST });

    const response = await api.get('/api/v1/admin/roles/');
    const roles = response.data;

    dispatch({ type: GET_ROLES_SUCCESS, payload: roles });
  } catch (error) {
    dispatch({ type: GET_ROLES_FAILURE, payload: error.message });
  }
};

export const deleteRole = (roleId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ROLE_REQUEST });

    await api.delete(`/api/v1/admin/roles/${roleId}`);

    dispatch({ type: DELETE_ROLE_SUCCESS, payload: roleId });
  } catch (error) {
    dispatch({ type: DELETE_ROLE_FAILURE, payload: error.message });
  }
};

export const editRole = (roleId, updatedRoleData) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_ROLE_REQUEST });

    const response = await api.put(
      `/api/v1/admin/roles/${roleId}`,
      updatedRoleData,
    );
    const editedRole = response.data;

    dispatch({ type: EDIT_ROLE_SUCCESS, payload: editedRole });
  } catch (error) {
    dispatch({ type: EDIT_ROLE_FAILURE, payload: error.message });
  }
};

export const toggleRolePermission =
  (roleId, permission, isEnabled) => async (dispatch) => {
    try {
      dispatch({ type: TOGGLE_ROLE_PERMISSION_REQUEST });

      // Send a request to toggle the role permission on the server
      await api.post(`/api/v1/admin/roles/${roleId}/permission/toggle`, {
        permission,
        isEnabled,
      });

      // Assuming the toggle was successful, you can dispatch a success action
      dispatch({ type: TOGGLE_ROLE_PERMISSION_SUCCESS });
    } catch (error) {
      dispatch({
        type: TOGGLE_ROLE_PERMISSION_FAILURE,
        payload: error.message,
      });
    }
  };

export const findRoleById = (roleId) => async (dispatch) => {
  try {
    dispatch({ type: FIND_ROLE_BY_ID_REQUEST });

    const response = await api.get(`/api/v1/admin/roles/${roleId}`);
    const role = response.data;

    dispatch({ type: FIND_ROLE_BY_ID_SUCCESS, payload: role });
  } catch (error) {
    dispatch({ type: FIND_ROLE_BY_ID_FAILURE, payload: error.message });
  }
};
