import { useAppDispatch } from "@/hooks/ReduxHooks";
import EditIcon from "@/icons/EditIcon";
import TrashIcon from "@/icons/TrashIcon";
import { ITodo } from "@/models/ITodo";
import { deleteTodo, toggleTodoStatus } from "@/store/TodoSlice";
import clsx from "clsx";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import MyBtn from "@components/MyBtn";

interface Props {
  todo: ITodo;
  index: number;
  onOpenEditModal: (todo: ITodo) => void;
}

const TodoItem: React.FC<Props> = ({ todo, index, onOpenEditModal }) => {
  const dispatch = useAppDispatch();

  const handleChangeTodoStatus = () => {
    dispatch(toggleTodoStatus(todo.id));
  };

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="flex gap-x-2 items-center bg-white border border-solid rounded px-3 py-2 shadow-sm mb-2"
        >
          <input
            type="checkbox"
            name={todo.title}
            id={todo.id.toString()}
            checked={todo.completed}
            onChange={handleChangeTodoStatus}
            className="flex-none w-5 h-5"
          />
          <span
            className={clsx("grow text-sm overflow-x-auto", {
              "line-through": todo.completed,
            })}
          >
            {todo.title}
          </span>
          <div className="flex gap-x-1">
            <MyBtn onClick={() => onOpenEditModal(todo)}>
              <EditIcon />
            </MyBtn>
            <MyBtn onClick={handleDeleteTodo}>
              <TrashIcon />
            </MyBtn>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default TodoItem;
