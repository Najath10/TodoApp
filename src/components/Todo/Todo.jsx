import React, { useEffect, useRef,useState } from "react";
import "./todo.css";
import { TodoInput } from "./TodoInput/TodoInput";
import { TodoList } from "./TodoList/TodoList";
import { v4 as uuidv4 } from 'uuid';
import "react-toastify/dist/ReactToastify.css";

export const Todo = () => {
  const inputTodoRef = useRef(null);
  const [selectedId, setSelectedId] = useState(0);
  const [editInput, setEditInput] = useState("");
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    let dataLocalStorage = localStorage.getItem("todos");
    let parsedData = JSON.parse(dataLocalStorage);
    if (parsedData) {
      setTodo(parsedData);
    }
    inputTodoRef.current.focus();
  }, []);

  const handleInputValue = (event) => {
    setInputValue(event.target.value);
  };

  const addTodo = () => {
    if (inputValue !== "") {
        console.log("Add Todo clicked"); // Debugging line
        let currentTodo = {
            id: uuidv4(),
            task: inputValue,
            completed: false,
        };
        setTodo((prev) => [...prev, currentTodo]);
        setInputValue("");
    } else {
        alert("enter the todo, can't be empty");
    }
};


  useEffect(() => {
    if (todo?.length > 0) {
        localStorage.setItem("todos", JSON.stringify(todo));
    }
  }, [todo]);
  
  const handleEnter = (event) => {
    const { key } = event;
    if (key == "Enter") {
        addTodo();
    }
};

const editTodo = (id) => {
  setSelectedId(id);
  let localData = localStorage.getItem("todos");
  let parsedData = JSON.parse(localData);
  let editingTodo = parsedData.filter((tod) => tod?.id === id);
  editingTodo.forEach((EditingElement) => {
      setEditInput(EditingElement?.task);
  });
};
//editAndSave
const editAndSave = (id) => {
  const updated = {
      id: id,
      task: editInput,
      completed: false,
  };
  const updatedTodo = todo?.map((tod) => {
      if (tod.id === id) {
          return updated;
      } else {
          return tod;
      }
  });
  setTodo(updatedTodo);
  setSelectedId();
};

//completeTodo
const completeTodo = (id) => {
  const complete = todo?.map((tod) => {
      if (tod.id === id && tod.completed === true) {
          return { ...tod, completed: false };
      } else if (tod.id === id) {
          return { ...tod, completed: true };
      } else {
          return tod;
      }
  });
  setTodo(complete);
};

//delete todo and then update localstorage and state
const deleteTodo = (id) => {
  let localData = localStorage.getItem("todos");
  let parsedData = JSON.parse(localData);
  let undeleted = parsedData?.filter((todo) => todo?.id !== id);
  localStorage.setItem("todos", JSON.stringify(undeleted));
  setTodo(undeleted);
};

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <TodoInput
      handleInputValue={handleInputValue}
      inputValue={inputValue}
      handleEnter={handleEnter}
      inputTodoRef={inputTodoRef} 
      addTodo={addTodo}
      />

      <TodoList 
       todo={todo}
       deleteTodo={deleteTodo}
       editTodo={editTodo}
       editInput={editInput}
       setEditInput={setEditInput}
       selectedId={selectedId}
       setSelectedId={setSelectedId}
       editAndSave={editAndSave}
       completeTodo={completeTodo}
       />
    </div>
  );
};
