import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./slice/authSlice";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// static type for selector and dispatch
// export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// hooks that have been given a static type
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
