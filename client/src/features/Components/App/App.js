import { Routes, Route } from "react-router-dom"
import './App.css';
import MessageList from '../MessageList/MessageList';
import ChatSelection from "../ChatSelection";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        chat App
      </header>
      <Routes>
        <Route path="/" element={ <ChatSelection />} />
        <Route path="/message" element={ <MessageList />} />
      </Routes>
    </div>
  );
}

export default App;
