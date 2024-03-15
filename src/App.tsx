import TodoList from "@components/TodoList";
import TodoCreateForm from "@components/TodoCreateForm";

function App() {
  return (
    <main className=" min-h-screen bg-orange-200">
      <div className="container w-80 flex flex-col items-center pt-10 pb-24 px-5">
        <h1 className="mb-4 text-2xl font-semibold italic antialiased ">
          Todo List App
        </h1>
        <TodoCreateForm />
        <TodoList />
      </div>
    </main>
  );
}

export default App;
