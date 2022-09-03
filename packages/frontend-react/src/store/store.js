import {combineReducers, configureStore} from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'
import userReducer from './slices/userSlice'
import callControlReducer from './slices/callContollSlice'
import { Api } from '../services/api'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userSlice']
}

const rootReducer = combineReducers({
  appSlice: appReducer,
  userSlice: userReducer,
  callControlSlice: callControlReducer,
  [Api.reducerPath]: Api.reducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
})

export const persistor = persistStore(store)