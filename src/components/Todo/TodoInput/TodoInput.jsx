import React from "react";
import "./TodoInput.css";
export const TodoInput = ({
  handleInputValue,
  inputValue,
  handleEnter,
  inputTodoRef,
  addTodo,
}) => {
  return (
    <div className="todo-input-container">
      <input className="input-field"
       type="text" 
       placeholder="New Todo"
       name="todo"
       ref={inputTodoRef}
       value={inputValue}
       onChange={handleInputValue}
       onKeyDown={handleEnter}
       />
      <button onClick={() => addTodo()} className="add-todo-button"> ADD TODO</button>
    </div>
  );
};
