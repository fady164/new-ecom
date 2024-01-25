import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cart from "./cart/cartSlice";
import categories from "./categories/categoriesSlice";
import products from "./products/prodcutsSlice";
import auth from "./user/authSlice";

const cartPersistConfig = {
  key: "cart",
  storage,
  whiteList: ["cart"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whiteList: ["auth"],
};

const reducers = combineReducers({
  categories,
  products,
  cart: persistReducer(cartPersistConfig, cart),
  auth: persistReducer(authPersistConfig, auth),
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
