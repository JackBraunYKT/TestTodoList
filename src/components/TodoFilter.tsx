import { TFilterOption, FilterOptions } from "@/models/FilterOptions";
import clsx from "clsx";
import React from "react";

interface Props {
  onFilterChange: (value: TFilterOption) => void;
  currentOption: TFilterOption;
}

const TodoFilter: React.FC<Props> = ({ onFilterChange, currentOption }) => {
  const handleFilterClick = (event: React.MouseEvent) => {
    const filterValue = event.currentTarget.getAttribute("value");
    if (filterValue) {
      onFilterChange(filterValue as TFilterOption);
    }
  };

  return (
    <div className="mb-4 w-full flex text-xs text-gray-400">
      <button
        className={clsx("px-3 py-2 border-b-2", {
          "border-red-600 text-black": currentOption === FilterOptions.all,
        })}
        type="button"
        value={FilterOptions.all}
        onClick={handleFilterClick}
      >
        Все
      </button>
      <button
        className={clsx("px-3 py-2 border-b-2 grow", {
          "border-red-600 text-black":
            currentOption === FilterOptions.uncompleted,
        })}
        type="button"
        value={FilterOptions.uncompleted}
        onClick={handleFilterClick}
      >
        Невыполненные
      </button>
      <button
        className={clsx("px-3 py-2 border-b-2 grow", {
          "border-red-600 text-black":
            currentOption === FilterOptions.completed,
        })}
        type="button"
        value={FilterOptions.completed}
        onClick={handleFilterClick}
      >
        Выполненные
      </button>
    </div>
  );
};

export default TodoFilter;
