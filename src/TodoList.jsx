import React from "react";
import { useState } from "react";
import { useTodo } from "./TodoContext";

function TodoList({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMgs, setTodoMgs] = useState(todo.todo);
  const { updateTodo, deletTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMgs });
    setIsTodoEditable(false);
  };
  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`bg-[#ffff] flex mb-2 me-3  items-center justify-between border-1 border-cyan-400 rounded-3xl my-1
    ${todo.completed ? "bg-cyan-400" : "bg-[white]"}
    ${isTodoEditable ? "bg-cyan-50 border-2" : ""}`}
    >
      <div className="flex flex-auto">
        <input
          type="checkbox"
          className="cursor-pointer flex-1  ml-3 checkbox"
          checked={todo.completed}
          onChange={toggleCompleted}
        />
        <input
          type="text"
          className={`bg-transparent text-[#0048fd] flex-auto px-3 border-0 outline-0 text-2xl capitalize ${
            isTodoEditable ? "text-black transition-all translate-0.5" : ""
          } ${todo.completed ? "text-black" : ""}`}
          value={todoMgs}
          autoFocus={true}
          spellCheck={false}
          onChange={(e) => setTodoMgs(e.target.value)}
          readOnly={!isTodoEditable}
        />
      </div>

      <div>
        <button
          className="bg-[#eff6f9]  border-1 hover:bg-[#e3d8e3] active:bg-[#c7c1c1] rounded-4xl p-2 h-10 m-1 shadow-2xl shadow-red-600"
          onClick={() => {
            if (todo.completed) return;
            if (isTodoEditable) {
              editTodo();
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={todo.completed}
        >
          {isTodoEditable ? "📜" : "✒️"}
        </button>

        <button
          className="bg-[#eff6f9] border-1  hover:bg-[#e3d8e3] active:bg-[#c7c1c1] rounded-4xl p-2 h-10 m-1 shadow-2xl shadow-black"
          onClick={() => deletTodo(todo.id)}
        >
          ❌
        </button>
      </div>
    </div>
  );
}

export default TodoList;
