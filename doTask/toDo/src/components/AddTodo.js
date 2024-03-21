import React, { useState } from "react";
import { useDispatch } from "ract-redux";
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
      <form onSubmit={handleSubmit} className="space-x-3 mt-12">
        <input type="text" />
      </form>
    </>
  );
}
export default AddTodo;
