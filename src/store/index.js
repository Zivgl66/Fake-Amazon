import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./auth";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

//initialize the global redux state
// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export default store;

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  // devTools: process.env.NODE_ENV !== "production",
  // middleware: [thunk],
});

export const persistor = persistStore(store);
