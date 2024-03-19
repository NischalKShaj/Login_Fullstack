// importing requrired modules for the redux statemanagement
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import adminReducer from "./admin/adminSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// combining reducers
const rootReducer = combineReducers({ user: userReducer, admin: adminReducer });

// adding the persistConfig this helps in storing the data in the localstorage
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// using redux persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// exporting the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// exporting the persist store
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
