import React, { useEffect, useState } from "react";
import List from "./components/List";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FullScreen = styled.div`
width: 100vw;
height: 100vh;
display: flex;
justify-content:center;
align-items: center;
`

const TodoListBackground = styled.div`
  box-shadow: 5px 5px 10px grey;
  background-color: #EEE3CB;
  border-radius: 10px;
  min-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 20px;

`;

const TodoListContent = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
h3{
  color: #472D2D;
margin: 0;

}
`

const Form = styled.form`
padding: 6% 0 5%;

input{
  margin-right: 5px;
}

button{
  background-color: #C2DBC1;
  border-color: #F6E3C5;
  color: #464E2E;
  font-weight: bold;
}
`
const ClearBtn = styled.button`
background-color: #BBBBBB;
height: 35px;

color: #9A8194;
font-weight: bold;
border-color: #B7B7B7;
`
const getLocalStorage= ()=>{
  let list = localStorage.getItem("list")
  if(list) {
    return list=JSON.parse(localStorage.getItem("list"))
  } else{
    return [];
  }
}

const App = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [list, setList] = useState(getLocalStorage());
  const [todoTitle, setTodoTitle] = useState("");
  const [editID, setEditID] = useState(null);


useEffect(()=>{
  localStorage.setItem("list", JSON.stringify(list))
}, [list])


  const editItem = (id, title) => {
    setTodoTitle(title);
    setIsEditing(true);
    setEditID(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoTitle) {
      toast.warning("Please Enter Value", {position: "top-center", autoClose:200});
    } else if (isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: todoTitle };
          }
          return item;
        })
      );
      toast.success("Value Changes", {position: "top-center", autoClose:200});
      setIsEditing(false);
      setTodoTitle("");
    } else {
      const newItem = { id: new Date().getTime().toString(), title: todoTitle };
      setList([...list, newItem]);
      toast.success("Item Added to the List", {position: "top-center", autoClose:200})
      setTodoTitle("");
    }

  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    toast.success("Item Removed", {position: "top-center", autoClose:3000})
    setIsEditing(false);
  };
  const clearItems = () => {
    if (list.length>0){
    setList([]);
    toast.success("Empty List", {position: "top-center", autoClose:200})
    setTodoTitle("")}
  };
  

  return (
    <FullScreen>
    <TodoListBackground>
    <TodoListContent>
      <ToastContainer position="top-center" autoClose={200}/>
      <h3>Todo list using local storage</h3>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        ></input>
        <button type="submit">{isEditing ? "Edit" : "Submit"}</button>
      </Form>
      <List items={list} editItem={editItem} removeItem={removeItem} />
      <ClearBtn onClick={clearItems}>Clear Items</ClearBtn>
    </TodoListContent>
    </TodoListBackground>
    </FullScreen>
  );
};

export default App;
