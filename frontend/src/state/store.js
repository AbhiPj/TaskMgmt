import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import taskStateReducer from "./taskSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    taskState: taskStateReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
