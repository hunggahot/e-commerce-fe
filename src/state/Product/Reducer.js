import {
  DELETE_PRODUCTS_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  IMPORT_PRODUCTS_FAILURE,
  IMPORT_PRODUCTS_REQUEST,
  IMPORT_PRODUCTS_SUCCESS,
} from './ActionType';

const initialState = {
  products: [],
  product: null,
  importing: false,
  importError: null,
  importedData: null,
  loading: false,
  error: null,
};

export const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PRODUCTS_REQUEST:
    case FIND_PRODUCT_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };

    case FIND_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };

    case FIND_PRODUCT_BY_ID_SUCCESS:
      return { ...state, loading: false, error: null, product: action.payload };

    case DELETE_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        deletedProduct: action.payload,
      };

    case FIND_PRODUCTS_FAILURE:
    case FIND_PRODUCT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case IMPORT_PRODUCTS_REQUEST:
      return {
        ...state,
        importing: true,
        importError: null,
      };

    case IMPORT_PRODUCTS_SUCCESS:
      return {
        ...state,
        importing: false,
        importError: null,
        importedData: action.payload,
      };

    case IMPORT_PRODUCTS_FAILURE:
      return {
        ...state,
        importing: false,
        importError: action.payload,
      };

    default:
      return state;
  }
};
