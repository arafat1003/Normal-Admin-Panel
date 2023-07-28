import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlicer";
import productReducer from "./productSlicer/productSlicer";
import filterReducer from "./productSlicer/filterSlicer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
  },
});
