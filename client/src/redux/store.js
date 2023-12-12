import { combineReducers, configureStore } from "@reduxjs/toolkit";
import useReducer from "./user/userSlice";
import depositReducer from "./user/depositSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  user: useReducer,
  deposit: depositReducer, // Include deposit reducer in combineReducers
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
