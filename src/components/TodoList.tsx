import React from "react";
import TodoItem from "@components/TodoItem";
import { useAppDispatch, useAppSelector } from "@/hooks/ReduxHooks";
import { changeOrderTodos, selectTodos } from "@/store/TodoSlice";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import TodoFilter from "./TodoFilter";
import { FilterOptions, TFilterOption } from "@/models/FilterOptions";
import { ITodo } from "@/models/ITodo";
import TodoUpdateModal from "@components/TodoUpdateModal";

const TodoList: React.FC = () => {
  const todos = useAppSelector(selectTodos);
  const [currentFilterOption, setCurrentFilterOption] =
    React.useState<TFilterOption>(FilterOptions.all);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const currentTodoForModal = React.useRef<ITodo>();
  const handleOpenModal = (todo: ITodo) => {
    setIsOpen(true);
    currentTodoForModal.current = todo;
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const currentTodos =
    currentFilterOption === FilterOptions.completed
      ? todos.filter((item) => item.completed)
      : currentFilterOption === FilterOptions.uncompleted
      ? todos.filter((item) => !item.completed)
      : todos;

  const onFilterChange = (value: TFilterOption) => {
    setCurrentFilterOption(value);
  };

  const handleOnDragEnd = React.useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      const { source, destination } = result;
      const copiedTodos = [...todos];
      const [removed] = copiedTodos.splice(source.index, 1);
      copiedTodos.splice(destination.index, 0, removed);
      dispatch(changeOrderTodos(copiedTodos));
    },
    [todos, dispatch]
  );

  return (
    <>
      {todos.length === 0 ? (
        <div className="italic">Список задач пуст</div>
      ) : (
        <>
          <TodoFilter
            onFilterChange={onFilterChange}
            currentOption={currentFilterOption}
          />
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="w-full"
                >
                  {currentTodos.map((item, index) => (
                    <TodoItem
                      todo={item}
                      key={item.id}
                      index={index}
                      onOpenEditModal={handleOpenModal}
                    />
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <TodoUpdateModal
            open={isOpen}
            onClose={handleCloseModal}
            todo={currentTodoForModal.current}
          />
        </>
      )}
    </>
  );
};

export default TodoList;
