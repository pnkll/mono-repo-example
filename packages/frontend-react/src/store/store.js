import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'
import {authApi} from '../services/AuthService'

export const store = configureStore({
  reducer: {
    app: appReducer,
    [authApi.reducerPath]: authApi.reducer 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})