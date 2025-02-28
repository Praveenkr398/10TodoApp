import React, { useState } from "react";
import { useTodo } from "./TodoContext";

function AddTodo() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();
  
  const add = (e) => {
    e.preventDefault();

    if (!todo) return;

    // AddTodo({id:Date.now, todo:todo, completed:false})
    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form
      onSubmit={add}
      className="bg-[#f8f6f6] rounded-4xl mx-10 my-5 flex relative "
    >
      <input
        type="text"
        placeholder="write something here"
        className="text-2xl text-[#7a2eff] placeholder:text-gray-300 shadow-[#a2fef0] shadow-2xl p-4 flex-auto relative outline-1 outline-offset-5 border-0 rounded-4xl  px-5 capitalize "
        value={todo}
        spellCheck={false}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="text-2xl cursor-pointer active:bg-cyan-500 text-white p-4 absolute right-0 outline-0 bg-blue-500 border-1 rounded-r-4xl  px-5 capitalize "
      >
        Add
      </button>
    </form>
  );
}

export default AddTodo;
