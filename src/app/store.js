import authReducer from '../feature/Auth/authSlice';

const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
  auth: authReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;