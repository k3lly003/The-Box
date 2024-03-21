import { configureStore } from "redux-toolkit";
import todoReducer from "../features/todo/todoslice";

export const store = configureStore({
  reducer: todoReducer,
});
