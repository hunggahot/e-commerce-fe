import { api } from '../../config/apiConfig';
import {
  CREATE_REVIEW_REQUEST,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAILURE,
  GET_PRODUCT_REVIEWS_REQUEST,
  GET_PRODUCT_REVIEWS_SUCCESS,
  GET_PRODUCT_REVIEWS_FAILURE,
} from './ActionType';

// Action creator for creating a review
export const createReview = (productId, reviewText) => async (dispatch) => {
  console.log('create review data - ', productId);
  try {
    dispatch({ type: CREATE_REVIEW_REQUEST });

    const { data } = await api.post(
      `/api/v1/reviews/product/${productId}/create`,
      { review: reviewText },
    );
    console.log('created review ', data);
    dispatch({
      type: CREATE_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_REVIEW_FAILURE,
      payload: error.data,
    });
  }
};

// Action creator for getting product reviews
export const getProductReviewsSuccess = (reviews) => ({
  type: GET_PRODUCT_REVIEWS_SUCCESS,
  payload: reviews,
});

export const getProductReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_REVIEWS_REQUEST });

    // Make an API request to get product reviews by productId
    const { data } = await api.get(`/api/v1/reviews/product/${productId}`);

    dispatch(getProductReviewsSuccess(data)); // Set reviews in Redux store
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_REVIEWS_FAILURE,
      payload: error.data,
    });
  }
};
