import React, { useState, useEffect } from "react";
import sunImg from "../images/icon-sun.svg";
import moonImg from "../images/icon-moon.svg";
import "./App.scss";

import TodoForm from "./components/inputTodo";
import TodoList from "./components/todoList";

function App() {
  // const storage = JSON.parse(localStorage.getItem("todoStorage"));
  // console.log(storage);

  const [lightTheme, setLighTheme] = useState(false);
  const [list, setList] = useState(() => JSON.parse(localStorage.getItem("todoStorage")) || []);
  const [filteredList, setFilteredList] = useState([]);
  const [currentTab, setCurrentTab] = useState("All");
  // const [currentListId, setCurrentListId] = useState((list[0] && list[0].id) || "");

  useEffect(() => {
    localStorage.setItem("todoStorage", JSON.stringify(list));
    setFilteredList(list);
  }, [list]);

  function changeTheme() {
    setLighTheme((prev) => !prev);
  }

  function pushCompleteTodoToLast() {
    setList((uncompleteTodos) => {
      const incompleteTodos = uncompleteTodos.filter((todo) => !todo.completed);
      const completeTodos = uncompleteTodos.filter((todo) => todo.completed);

      return [...incompleteTodos, ...completeTodos];
    });
  }

  // console.log(list);

  return (
    <div className={`App ${lightTheme ? "light-theme" : ""}`}>
      <div className={`header ${lightTheme ? "light-theme-header" : ""}`}></div>
      <main>
        <div className="title__wrapper">
          <h1 className="todo-txt">TODO</h1>
          <button className="toggle-btn" onClick={changeTheme}>
            <img src={`${lightTheme ? moonImg : sunImg}`} alt="sum image" />
          </button>
        </div>
        <TodoForm pushCompleteTodoToLast={pushCompleteTodoToLast} list={list} setList={setList} setCurrentTab={setCurrentTab} />
        <TodoList pushCompleteTodoToLast={pushCompleteTodoToLast} list={list} setList={setList} filteredList={filteredList} setFilteredList={setFilteredList} currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </main>
    </div>
  );
}

export default App;
