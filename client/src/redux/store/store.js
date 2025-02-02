import { configureStore } from '@reduxjs/toolkit';
import UserSlice from '../features/userSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from "redux-persist/lib/storage";

const userPersistConfig = {
  key: 'User',
  storage,
  // whitelist: ['User'], // Only save specific slices of state
};


const userPersistedReducer = persistReducer(userPersistConfig, UserSlice);

export const store = configureStore({
  reducer: {
    User: userPersistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
