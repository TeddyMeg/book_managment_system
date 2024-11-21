import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.ts';
import { apiSlice } from './slices/apislice.ts';


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;