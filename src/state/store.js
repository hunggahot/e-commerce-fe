import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './Auth/Reducer';
import { customerProductReducer } from './Product/Reducer';
import { cartReducer } from './Cart/Reducer';
import { orderReducer } from './Order/Reducer';
import adminOrderReducer from './Admin/Order/Reducer';
import reviewReducer from './Review/Reducer';
import { adminLoginReducer } from './Admin/Auth/Reducer';
import customerReducer from './Admin/Customer/Reducer';
import roleReducer from './Admin/Role/Reducer';

const rootReducers = combineReducers({
  auth: authReducer,
  products: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
  adminOrder: adminOrderReducer,
  reviews: reviewReducer,
  adminLogin: adminLoginReducer,
  customers: customerReducer,
  roles: roleReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
