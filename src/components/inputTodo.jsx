import React from "react";
import "./inputTodo.scss";
function inputTodo() {
  return (
    <div className="input-todo__container">
      <form className="todo-form">
        <input placeholder="" type="text" name="todo" id="todo" className="todo-input" />
        <label htmlFor="todo" className="todo-label">
          create a new todo...
        </label>
      </form>
    </div>
  );
}

export default inputTodo;
