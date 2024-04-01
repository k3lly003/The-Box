import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import todoReducer from "../src/features/todo/todoslice";

const errorMiddleware = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (error) {
    console.error("An error occurred in Redux:", error);
  }
};

export const store = configureStore({
  reducer: todoReducer,
  middleware: [...getDefaultMiddleware(), errorMiddleware],
  enhancers: [composeWithDevTools()],
});
