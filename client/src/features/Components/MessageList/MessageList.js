import React, { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages } from '../../../redux/message/messageSlice';

function MessageList({ userName, groupName, setGroupName, setUsername }) {
  const [currentMsg, setCurrentMsg] = useState('');

  const messageList = useSelector((state) => {
    return state.message.entities
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMessages())
    return () => {
      setGroupName("");
      setUsername("")
    }
  }, [dispatch])

  const { sendMessage } = useWebSocket('ws://localhost:8000', {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    onMessage: (message) => {
      console.log("message received", message)
    }
  });

  const handleClick = () => {
    let message = {
      messageText: currentMsg,
      userName: userName,
      groupName: groupName
    }
    sendMessage(JSON.stringify(message))
  }

  return (
    <div>
      <div>MessageList</div>
      <div>
        {messageList && messageList.map((message, index) => {
          <div key={index}>
            {message.messageText}
          </div>
        })}
      </div>
      {userName && groupName && <div>
        <input type='textarea' value={currentMsg} onChange={(event) => { setCurrentMsg(event.target.value) }} />
        <button onClick={handleClick}>Send</button>
      </div>}
    </div>
  )
}

export default MessageList