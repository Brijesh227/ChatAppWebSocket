import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages } from '../../../redux/message/messageSlice';
import io from "socket.io-client";

function MessageList({ userName, groupName, setGroupName, setUsername }) {
  const SERVER_URI = "http://localhost:8000";

  const [currentMsg, setCurrentMsg] = useState('');
  const [server, setServer] = useState(io(SERVER_URI))

  const messageList = useSelector((state) => {
    return state.message.entities
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMessages(groupName))
  }, [dispatch])

  useEffect(() => {
    if (userName && groupName) {
      console.log("trying to connect");
      server.emit("join", { userName, groupName }, (error) => {
        if (error) {
          console.log(error);
        }
      });
      server.on("message", (message) => {
        dispatch(fetchMessages(groupName))
        console.log("message received from server", message);
      });
    }

    return () => {
      server.disconnect();
      setGroupName("");
      setUsername("")
    }
  }, []);

  const handleClick = (e) => {
    let messageObject = {
      messageText: currentMsg,
      userName: userName,
      groupName: groupName
    }

    e.preventDefault();
    server.emit("sendMessage", { message: JSON.stringify(messageObject) });
    setCurrentMsg("");
  }

  return (
    <div>
      <div>MessageList</div>
      <div>
        {messageList && 
          messageList.map((message,index) =>
            <div key={index}>from {message.userName} - {message.messageText}</div>
        )}
      </div>
      {userName && groupName && <div>
        <input type='textarea' value={currentMsg} onChange={(event) => { setCurrentMsg(event.target.value) }} />
        <button onClick={handleClick}>Send</button>
      </div>}
    </div>
  )
}

export default MessageList