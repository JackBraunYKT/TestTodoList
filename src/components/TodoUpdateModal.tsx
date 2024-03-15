import { Dialog } from "@headlessui/react";
import { ITodo } from "@/models/ITodo";
import { useAppDispatch } from "@/hooks/ReduxHooks";
import { Field, Form, Formik } from "formik";
import { updateTodo } from "@/store/TodoSlice";

interface Props {
  todo?: ITodo;
  open: boolean;
  onClose: () => void;
}

const TodoUpdateModal: React.FC<Props> = ({ todo, open, onClose }) => {
  const dispatch = useAppDispatch();

  return (
    <Dialog className="relative z-10" open={open} onClose={onClose}>
      <div className="fixed inset-0 overflow-y-auto bg-black/50">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl">
            <Dialog.Title className="mb-4 text-lg font-medium leading-6 text-gray-900">
              Изменить описание задачи
            </Dialog.Title>
            {todo && (
              <Formik
                initialValues={{ currentTitle: todo.title }}
                onSubmit={(values) => {
                  const editedTodo: ITodo = {
                    ...todo,
                    title: values.currentTitle,
                  };
                  dispatch(updateTodo(editedTodo));
                  onClose();
                }}
              >
                <Form>
                  <Field
                    className="w-full p-2 pl-3 rounded shadow-sm border border-solid focus:outline-none focus:ring-2"
                    id={`currentTitle`}
                    name={`currentTitle`}
                    required
                  />
                  <div className="flex gap-x-2 mt-4 justify-center sm:justify-start">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Сохранить
                    </button>
                    <button
                      className="inline-flex justify-center rounded border border-gray-300 border-transparent px-4 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onClose}
                    >
                      Отмена
                    </button>
                  </div>
                </Form>
              </Formik>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default TodoUpdateModal;
