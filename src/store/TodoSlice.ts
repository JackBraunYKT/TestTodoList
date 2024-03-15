import { ITodo } from "@/models/ITodo";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";

export type TodoState = ITodo[];

const initialState: TodoState = JSON.parse(
  localStorage.getItem("todos") ?? "[]"
);

export const TodoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<ITodo>) {
      state.unshift(action.payload);
      localStorage.setItem("todos", JSON.stringify(state));
    },
    deleteTodo(state, action: PayloadAction<number>) {
      const currentState = state.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(currentState));
      return currentState;
    },
    toggleTodoStatus(state, action: PayloadAction<number>) {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem("todos", JSON.stringify(state));
      }
    },
    updateTodo: (state, action: PayloadAction<ITodo>) => {
      const todoIndex = state.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (todoIndex !== -1) {
        state[todoIndex].title = action.payload.title;
        localStorage.setItem("todos", JSON.stringify(state));
      }
    },
    changeOrderTodos: (state, action: PayloadAction<ITodo[]>) => {
      localStorage.setItem("todos", JSON.stringify(action.payload));
      return (state = action.payload);
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
