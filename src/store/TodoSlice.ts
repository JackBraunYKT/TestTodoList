import { ITodo } from "@/models/ITodo";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export type TodoState = ITodo[];
const initialState: TodoState = [];

export const TodoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<ITodo>) {
      state.unshift(action.payload);
    },
    deleteTodo(state, action: PayloadAction<number>) {
      return state.filter((todo) => todo.id !== action.payload);
    },
    toggleTodoStatus(state, action: PayloadAction<number>) {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      const todoIndex = state.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (todoIndex !== -1) {
        state[todoIndex].title = action.payload.title;
      }
    },
    changeOrderTodos: (state, action: PayloadAction<ITodo[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const {
  addTodo,
  deleteTodo,
  toggleTodoStatus,
  updateTodo,
  changeOrderTodos,
} = TodoSlice.actions;
export const selectTodos = (state: RootState) => state.todos;
export default TodoSlice.reducer;
