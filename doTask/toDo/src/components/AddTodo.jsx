import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Fixed typo here
import { addTodo } from "../features/todo/todoslice";

function AddTodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput("");
  };

  return (
    <>
      <div className="flex-column justify-center align-middle">
        <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter todo"
            className="appearance-none  rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            Add Todo
          </button>
        </form>
      </div>
    </>
  );
}
export default AddTodo;
