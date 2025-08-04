import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../app/User/user";
import taskTypeReducer from "../app/TaskType/taskTypeSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  users: userReducer,
  taskTypes: taskTypeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users", "taskTypes"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
