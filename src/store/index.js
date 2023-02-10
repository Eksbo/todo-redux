// Точка ВХОДА
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice"; // todoReducer типа похуй там default

export default configureStore({
  reducer: {
    todos: todoReducer
  },

});
