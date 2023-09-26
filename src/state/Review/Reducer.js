// reviewReducer.js
import {
  GET_PRODUCT_REVIEWS_REQUEST,
  GET_PRODUCT_REVIEWS_SUCCESS,
  GET_PRODUCT_REVIEWS_FAILURE,
} from './ActionType';

const initialState = {
  reviews: [], // Initial reviews state
  review: null,
  loading: false,
  error: null,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_REVIEWS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PRODUCT_REVIEWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_PRODUCT_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload, // Set reviews to the fetched reviews array
      };

    default:
      return state;
  }
};

export default reviewReducer;
