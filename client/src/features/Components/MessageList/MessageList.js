import React, { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket';
import axios from "axios";
import './MessageList.css';

function MessageList() {
  let [currentMsg, setCurrentMsg] = useState("");
  let [messageList, setMessageList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/message")
      .then((res) => {
        setMessageList(res.data);
      }).catch((error) => {
        console.log("error to get message",error)
      })
    },
  []);

  const { sendMessage, readyState, getWebSocket } = useWebSocket('ws://localhost:8000', {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    onMessage: (message) => {
      console.log("message received", message)
    }
  });

  let sendMessageToWs = () => {
    let msg = {
      user: "brij",
      group: "it",
      content: currentMsg
    }
  }

  return (
    <div className='center'>
      <div>MessageList</div>
      <div className='chatbox'>
      {
        messageList.map((message, index) => {
          return (
          <div key={index}>
            <span>User: {message.user}</span>
            <span>Group: {message.group}</span>
            <span>Message: {message.content}</span>
          </div>
          )
        })
      }
      </div>
      <div>
        <input onChange={(event) => {setCurrentMsg(event.target.value)}} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default MessageList