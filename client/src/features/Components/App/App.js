import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom"
import './App.css';
import MessageList from '../MessageList/MessageList';
import ChatSelection from "../ChatSelection/ChatSelection";
import { useNavigate } from "react-router-dom";

function App() {

  const [userName, setUsername] = useState("");
  const [groupName, setGroupName] = useState("");

  function updateUserName(data) {
    setUsername(data);
  }

  function updateGroupName(data) {
    setGroupName(data);
  }

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName !== "" && groupName !== "") {
      navigate("/message");
    }
  }

  return (
    <div className="App">
      <header />
      <header className="App-header">
        chat App
      </header>
      <Routes>
        <Route path="/" element={<ChatSelection updateUserName={updateUserName} updateGroupName={updateGroupName} handleSubmit={handleSubmit} />} />
        <Route path="/message" element={<MessageList userName={userName} groupName={groupName} setUsername={setUsername} setGroupName={setGroupName} />} />
      </Routes>
    </div>
  );
}

export default App;
