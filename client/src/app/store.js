import {configureStore}from'@reduxjs/toolkit'
import {apiSlice}from'../features/api/apiSlice';
import authSliceReducer from '../features/auth/AuthSlice';
import workSlic from '../features/workspaces/workSlic';
export const store = configureStore({
   reducer:{
    [apiSlice.reducerPath]:apiSlice.reducer,
    auth:authSliceReducer,
    work:workSlic
   },
   middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware)

})