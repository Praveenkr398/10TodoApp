import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import { TodoProvider } from "./TodoContext";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  // console.log("todo", todos);

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => 
         prevTodo.id === id ? { ...prevTodo, ...todo } : prevTodo
      )
    );
  };

  const deletTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    // console.log("id", id);
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function menubar() {
    const menu = document.querySelector(".scrollbar");
    menu.classList.toggle("hidden");
  }

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deletTodo, toggleComplete }}
    >
      <div className="flex flex-col w-full cursor-default h-screen bg-[#ccf8fe] items-center justify-start pt-30 ">
        <div className="flex  flex-col rounded-lg shadow-2xl outline-1 outline-offset-5 p-5 shadow-300 shadow-blue-600 bg-[#e9e9e9] w-lg  gap-2  max-h-[500px]">
         
         {/* AddTodo component */}
          <div className="sticky top-0 bg-[#e9e9e9]">
            <h1 className="text-3xl px-4 mx-5 pb-5 my-2 font-bold text-cyan-500 relative">
              Todo App
              <span
                onClick={menubar}
                className="absolute cursor-pointer right-0 active:bg-cyan-200 active:rounded-4xl active:w-10 active:h-10"
              >
                &#19977;
              </span>
            </h1>
            <div>
              <AddTodo />
            </div>
          </div>
    {/* Todolist component */}
          <div className="scrollbar overflow-auto">
            {todos.map((item) => (
              <div key={item.id} className="list">
                <TodoList todo={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;