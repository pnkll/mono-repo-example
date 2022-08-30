import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'
import { Api } from '../services/api'

export const store = configureStore({
  reducer: {
    app: appReducer,
    [Api.reducerPath]: Api.reducer 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
})