import React from "react";
import { useState, useEffect } from "react";
import "./Todo.css";

//to get items from local storage
const getStoredItems = () => {
  let items = localStorage.getItem("Notes");
  if (items) {
    return JSON.parse(localStorage.getItem("Notes"));
  } else {
    return [];
  }
};

function Todo() {
  const [list, setList] = useState(getStoredItems());
  const [toDo, setToDo] = useState("");
  const [toggleAdd, setToggleAdd] = useState(true);
  const [update, setUpdate] = useState(null);
  const [deleteBtn, setDeleteBtn] = useState(false);

  const listToAdd = () => {
    let textfield = document.querySelector(".text-field");
    textfield.focus();
    if (!toDo) {
    } else if(toDo && !toggleAdd) {
      setList(
        list.map((data, id)=>{
          if(id === update){
            return ( toDo );
          }
          return data;
        })
      )
      setToggleAdd(true);
      setUpdate(null);
    } else {
      setList([...list, toDo]);
      setToDo("");
    }
  };

  const addItem = () => {
    listToAdd();
  };

  //press enter to add
  useEffect(() => {
    document.addEventListener("keydown", enterToAdd, true);
  });
  const enterToAdd = (e) => {
    if (e.key === "Enter") {
      listToAdd();
    }
  };

  //delete button
  const deleteList = (ind) => {
    setList([...list].filter((data, id) => id !== ind));
  };

  //edit items in list
  const editList = (ind) => {
    let editData = list.find((data, id) => id === ind);
    let textfield = document.querySelector(".text-field");
    textfield.focus();
    setToggleAdd(false);
    setToDo(editData);
    setUpdate(ind);
  };

  //Remove all list
  useEffect(() => {
    if (list.length > 1) {
      setDeleteBtn(true);
    }
  },[list.length]);

  const removeAll = () => {
    setList([]);
    setDeleteBtn(false);
  };
  
  //local Storage
  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(list));
  }, [list]);

  return (
    <div className="app">
      <h1>ToDo List</h1>
      <div className="input">
        <input
          type="text"
          className="text-field"
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          placeholder="Add items..."
        />
        {toggleAdd ? (
          <i className="fas fa-plus" onClick={() => addItem()}></i>
        ) : (
          <i className="fas fa-upload" onClick={() => addItem()}></i>
        )}
      </div>

      <ul className="todo">
        {list.map((element, id) => {
          return (
            <li className="things" key={id}>
              <div className="thingsData">{element}</div>
              <div className="right">
                <i
                  className="fa-solid fa-edit"
                  onClick={() => editList(id)}
                ></i>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => deleteList(id)}
                ></i>
              </div>
            </li>
          );
        })}
      </ul>
      {
        deleteBtn ? <button className="remove-all" onClick={() => removeAll()}>Remove All</button> : ''
      }
    </div>
  );
}

export default Todo;
