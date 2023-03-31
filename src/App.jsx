import React, { useState } from "react";
import sunImg from "../images/icon-sun.svg";
import "./App.scss";

import TodoForm from "./components/inputTodo";
import TodoList from "./components/todoList";

function App() {
  return (
    <div className="App">
      <div className="header"></div>
      <main>
        <div className="title__wrapper">
          <h1 className="todo-txt">TODO</h1>
          <button className="toggle-btn">
            <img src={sunImg} alt="sum image" />
          </button>
        </div>
        <TodoForm />
        <TodoList />
      </main>
    </div>
  );
}

export default App;
