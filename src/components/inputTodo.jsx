import React, { useRef } from "react";
import "./inputTodo.scss";

import { nanoid } from "nanoid";

function inputTodo(props) {
  const todoValue = useRef();

  function addTodo(e) {
    e.preventDefault();

    const itemInclude = props.list.some((item) => item.value === todoValue.current.value);

    if (!todoValue.current.value || itemInclude) return;

    let todos = {
      value: todoValue.current.value,
      id: nanoid(),
      completed: false,
      draggable: true,
      isDragging: false,
      dragEnter: false,
    };

    todoValue.current.value = "";

    props.setList((prevList) => [...prevList, todos]);
    props.setCurrentTab("All");
    props.pushCompleteTodoToLast();
  }

  return (
    <div className="input-todo__container">
      <form className="todo-form" onSubmit={addTodo}>
        <input placeholder="" type="text" name="todo" id="todo" className="todo-input" ref={todoValue} />
        <label htmlFor="todo" className="todo-label">
          create a new todo...
        </label>
      </form>
    </div>
  );
}

export default inputTodo;
