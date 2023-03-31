import React from "react";
import "./todoList.scss";
import deleteBtn from "../../images/icon-cross.svg";

function todoItem() {
  return (
    <div className="list__wrapper">
      <ul className="todo__list">
        <li className="todo__list--item">
          <input type="checkbox" name="todo-item" id="todo-item" className="todo-check" />
          <label htmlFor="todo-item" className="todo-label">
            Jog
          </label>
          <button className="delete-todo-btn">
            <img src={deleteBtn} alt="delete-btn" className="delete-btn" />
          </button>
        </li>

        <li className="todo__list--item">
          <input type="checkbox" name="todo-item" id="todo-item" className="todo-check" />
          <label htmlFor="todo-item" className="todo-label">
            Lorem ipsum dolor sit amet.
          </label>
          <button className="delete-todo-btn">
            <img src={deleteBtn} alt="delete-btn" className="delete-btn" />
          </button>
        </li>

        <li className="todo__list--item">
          <input type="checkbox" name="todo-item" id="todo-item" className="todo-check" />
          <label htmlFor="todo-item" className="todo-label">
            Lorem ipsum dolor sit amet.
          </label>
          <button className="delete-todo-btn">
            <img src={deleteBtn} alt="delete-btn" className="delete-btn" />
          </button>
        </li>

        <li className="more-info">
          <p className="items-left">5 items left</p>

          <div className="tab__list desktop-tab">
            <button className="tab__list--item" data-active-tab>
              All
            </button>
            <button className="tab__list--item">Active</button>
            <button className="tab__list--item">Completed</button>
          </div>

          <button className="clear-btn">Clear Completed</button>
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
