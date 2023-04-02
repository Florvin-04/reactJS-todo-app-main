import React, { useRef } from "react";

import "./todoList.scss";
import deleteBtn from "../../images/icon-cross.svg";

function todoItem(props) {
  // const [currenTab, setCurrentTab] = useState("All");

  // console.log(props.currentTab);

  function countActiveTodos() {
    let count = 0;
    props.list.map((list) => {
      list.completed === false ? count++ : count;
    });
    return count;
  }

  function clearCompletedTodos() {
    props.setList((todos) => todos.filter((todoItem) => (todoItem.completed !== true ? { ...todoItem } : null)));
  }

  function toggleCompleted(id) {
    props.setList((todos) => todos.map((todoItem) => (todoItem.id === id ? { ...todoItem, completed: !todoItem.completed, draggable: !todoItem.draggable } : todoItem)));
    props.setCurrentTab("All");
  }

  function deleteItem(id) {
    props.setList((todos) => todos.filter((todoItem) => (todoItem.id !== id ? { ...todoItem } : null)));
  }

  function completedTodos() {
    let completed = 0;
    let active = 0;

    props.list.filter((todo) => (todo.completed ? completed++ : active++));

    if (completed == 0 && props.currentTab === "Completed") {
      return (
        <li className="todo__list--item no-todos">
          <input type="checkbox" name="todo-item" className="todo-check" />
          <label className="todo-label">Complete Your TODOS</label>
          <button className="delete-todo-btn">
            <img src={deleteBtn} alt="delete-btn" className="delete-btn" />
          </button>
        </li>
      );
    }
    if (active == 0) {
      return (
        <li className="todo__list--item no-todos">
          <input type="checkbox" name="todo-item" className="todo-check" />
          <label className="todo-label">Put Some Todos</label>
          <button className="delete-todo-btn">
            <img src={deleteBtn} alt="delete-btn" className="delete-btn" />
          </button>
        </li>
      );
    }
  }

  function filterTodos(e) {
    const filter = e.target.dataset.value;

    props.setCurrentTab(filter);

    let filtered;

    if (filter === "Completed") {
      filtered = props.list.filter((todo) => todo.completed);
    }

    if (filter === "Active") {
      filtered = props.list.filter((todo) => !todo.completed);
    }

    if (filter === "All") {
      filtered = props.list.map((todo) => todo);
    }

    props.pushCompleteTodoToLast();

    props.setFilteredList(filtered);
  }

  // function pushCompleteTodoToLast() {
  //   props.setList((uncompleteTodos) => {
  //     const incompleteTodos = uncompleteTodos.filter((todo) => !todo.completed);
  //     const completeTodos = uncompleteTodos.filter((todo) => todo.completed);

  //     return [...incompleteTodos, ...completeTodos];
  //   });
  // }

  let todoItemDrag = useRef();
  let todoItemDragOver = useRef();

  function dragStart(id, index) {
    todoItemDrag.current = index;

    const listArr = [...props.list];

    listArr[index].isDragging = true;

    props.setList(listArr);
  }

  function dragEnter(id, index) {
    todoItemDragOver.current = index;

    const listArr = [...props.list];

    let finalArr = [];

    listArr.forEach((item) => {
      finalArr.push({
        value: item.value,
        id: item.id,
        completed: item.completed,
        draggable: item.draggable,
        isDragging: item.isDragging,
        dragEnter: false,
      });
    });

    finalArr[index].dragEnter = true;

    props.setList(finalArr);
  }

  // function dragLeave(index) {
  //   const listArr = [...props.list];

  //   listArr[index].dragEnter = false;

  //   props.setList(listArr);
  // }

  function dragDrop(id) {
    // e.preventDefault();
    const oldArray = [...props.list];

    const dragItemIndex = oldArray[todoItemDrag.current];
    const dragItemIndex2 = oldArray[todoItemDragOver.current];

    dragItemIndex2.dragEnter = false;
    dragItemIndex.isDragging = false;

    oldArray.splice(todoItemDrag.current, 1);
    oldArray.splice(todoItemDragOver.current, 0, dragItemIndex);

    props.setList(oldArray);
    props.pushCompleteTodoToLast();
    // console.log(dragItemIndex);
  }

  const list = props.filteredList.map((list, index) => {
    return (
      <li className={`todo__list--item ${list.isDragging ? "dragging" : ""} ${list.dragEnter ? "dragenter" : ""}`} key={list.id} draggable={list.draggable ? "true" : "false"} onDragStart={() => dragStart(list.id, index)} onDragEnter={() => dragEnter(list.id, index)} onDragEnd={() => dragDrop(list.id)} onDragOver={(e) => e.preventDefault()}>
        <input type="checkbox" name="todo-item" id={list.id} className="todo-check" checked={list.completed} onChange={() => toggleCompleted(list.id)} />
        <label htmlFor={list.id} className="todo-label">
          {list.value}
        </label>
        <button className="delete-todo-btn">
          <img src={deleteBtn} alt="delete-btn" className="delete-btn" onClick={() => deleteItem(list.id)} />
        </button>
      </li>
    );
  });

  return (
    <div className="list__wrapper">
      <ul className="todo__list">
        {/* {countActiveTodos() === 0 && (
          <li className="todo__list--item no-todos">
            <input type="checkbox" name="todo-item" className="todo-check" />
            <label className="todo-label">Put some Todos</label>
            <button className="delete-todo-btn">
              <img src={deleteBtn} alt="delete-btn" className="delete-btn" />
            </button>
          </li>
        )} */}
        {completedTodos()}
        {list}
        <li className="more-info">
          <p className="items-left">{countActiveTodos()} items left</p>

          <div className="tab__list desktop-tab">
            <button className="tab__list--item" data-value="All" data-active-tab={`${props.currentTab === "All" ? "true" : "false"}`} onClick={filterTodos}>
              All
            </button>
            <button className="tab__list--item" data-value="Active" data-active-tab={`${props.currentTab === "Active" ? "true" : "false"}`} onClick={filterTodos}>
              Active
            </button>
            <button className="tab__list--item" data-value="Completed" data-active-tab={`${props.currentTab === "Completed" ? "true" : "false"}`} onClick={filterTodos}>
              Completed
            </button>
          </div>

          <button className="clear-btn" onClick={clearCompletedTodos}>
            Clear Completed
          </button>
        </li>
      </ul>

      <div className="tab__list mobile-tab">
        <button className="tab__list--item" data-active-tab>
          All
        </button>
        <button className="tab__list--item">Active</button>
        <button className="tab__list--item">Completed</button>
      </div>
    </div>
  );
}

export default todoItem;
