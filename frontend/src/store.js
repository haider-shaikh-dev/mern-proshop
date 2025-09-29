import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlices";

import cartSliceReducer from "./slices/cartSlice"; //name is due to export default cartSlice.reducer;
import authSliceReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
export default store;
