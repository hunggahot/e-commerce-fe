import {
  CREATE_PRODUCTS_FAILURE,
  CREATE_PRODUCTS_REQUEST,
  CREATE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_FAILURE,
  DELETE_PRODUCTS_REQUEST,
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

import { API_BASE_URL, api } from '../../config/apiConfig';

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });

  const {
    colors,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  try {
    const { data } = await api.get(
      `/api/v1/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
    console.log('product data: ', data);
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const findProductById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

  const { productId } = reqData;

  try {
    const { data } = await api.get(
      `${API_BASE_URL}/api/v1/products/id/${productId}`,
    );

    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const createProduct = (product) => async (dispatch) => {
  console.log('create products data - ', product);
  try {
    dispatch({ type: CREATE_PRODUCTS_REQUEST });

    const { data } = await api.post(`/api/v1/admin/products/`, product);
    console.log('created products ', data);
    dispatch({
      type: CREATE_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log('catch error ', error);
    dispatch({ type: CREATE_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCTS_REQUEST });

    const { data } = await api.delete(
      `/api/v1/admin/products/${productId}/delete`,
    );
    dispatch({
      type: DELETE_PRODUCTS_SUCCESS,
      payload: productId,
    });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const importProductsRequest = () => ({
  type: IMPORT_PRODUCTS_REQUEST,
});

export const importProductsSuccess = () => ({
  type: IMPORT_PRODUCTS_SUCCESS,
});

export const importProductsFailure = (error) => ({
  type: IMPORT_PRODUCTS_FAILURE,
  payload: error,
});

export const importProducts = (file) => async (dispatch) => {
  dispatch(importProductsRequest());

  try {
    // Make an API call to send the Excel file for import
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/api/v1/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Dispatch success action
    dispatch(importProductsSuccess());
  } catch (error) {
    // Dispatch failure action with the error message
    dispatch(importProductsFailure(error.message));
  }
};
