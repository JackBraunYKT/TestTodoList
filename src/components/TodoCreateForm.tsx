import { useAppDispatch } from "@/hooks/ReduxHooks";
import PlusIcon from "@/icons/PlusIcon";
import { ITodo } from "@/models/ITodo";
import { addTodo } from "@/store/TodoSlice";
import { Field, Formik, Form } from "formik";
import React from "react";

interface values {
  title: string;
}

const TodoCreateForm: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{ title: "" }}
      onSubmit={(values: values, actions) => {
        const todo: ITodo = {
          id: Date.now(),
          title: values.title,
          completed: false,
        };
        dispatch(addTodo(todo));
        actions.resetForm();
      }}
    >
      <Form className="flex w-full items-center justify-center gap-x-2 mb-5">
        <Field
          id="title"
          name="title"
          placeholder="Описание задачи..."
          required
          className="grow p-2 pl-3 rounded shadow-sm border border-solid focus:outline-none focus:ring-2"
        />
        <button
          type="submit"
          className="flex-none h-10 w-10 flex justify-center items-center shadow-sm bg-green-500 hover:bg-green-600 text-white rounded ring-offset-2 focus:ring-2"
        >
          <PlusIcon />
        </button>
      </Form>
    </Formik>
  );
};

export default TodoCreateForm;
