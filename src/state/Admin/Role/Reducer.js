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

const initialState = {
  roles: [],
  permissions: [],
  foundRole: null,
  loading: false,
  error: null,
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROLES_REQUEST:
    case DELETE_ROLE_REQUEST:
    case EDIT_ROLE_REQUEST:
    case TOGGLE_ROLE_PERMISSION_REQUEST:
    case FIND_ROLE_BY_ID_REQUEST: // Add the new request type here
      return {
        ...state,
        loading: true,
      };

    case GET_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.payload,
        loading: false,
        error: null,
      };

    case DELETE_ROLE_SUCCESS:
      const updatedRoles = state.roles.filter(
        (role) => role.id !== action.payload,
      );

      return {
        ...state,
        roles: updatedRoles,
        loading: false,
        error: null,
      };

    case EDIT_ROLE_SUCCESS:
      const editedRoles = state.roles.map((role) =>
        role.id === action.payload.id ? action.payload : role,
      );

      return {
        ...state,
        roles: editedRoles,
        loading: false,
        error: null,
      };

    case TOGGLE_ROLE_PERMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case FIND_ROLE_BY_ID_SUCCESS: // Add the new success type here
      return {
        ...state,
        foundRole: action.payload,
        permissions: action.payload.permissions,
        loading: false,
        error: null,
      };

    case GET_ROLES_FAILURE:
    case DELETE_ROLE_FAILURE:
    case EDIT_ROLE_FAILURE:
    case TOGGLE_ROLE_PERMISSION_FAILURE:
    case FIND_ROLE_BY_ID_FAILURE: // Add the new failure type here
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default roleReducer;
