import { combineReducers, configureStore } from '@reduxjs/toolkit'
import appReducer from './slices/appSlice'
import userReducer from './slices/userSlice'
import sidebarReducer from './slices/sidebarSlice'
import callControlReducer from './slices/callContollSlice'
import rolesReducer from './slices/rolesSlice'
import notificationsReducer from './slices/notificationsSlice'
import { Api } from '../services/api'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['appSlice']
}

const rootReducer = combineReducers({
  appSlice: appReducer,
  userSlice: userReducer,
  callControlSlice: callControlReducer,
  sidebarSlice: sidebarReducer,
  rolesSlice: rolesReducer,
  notificationsSlice: notificationsReducer,
  [Api.reducerPath]: Api.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(Api.middleware),
})

export const persistor = persistStore(store)
