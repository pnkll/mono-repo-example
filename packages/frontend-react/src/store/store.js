import { configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'
import userReducer from './slices/userSlice'
import callControlReducer from './slices/callContollSlice'
import { Api } from '../services/api'

export const store = configureStore({
  reducer: {
    appSlice: appReducer,
    userSlice: userReducer,
    callControlSlice: callControlReducer,
    [Api.reducerPath]: Api.reducer 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
})