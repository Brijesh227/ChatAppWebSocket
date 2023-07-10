import React, { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket';
import { useSelector, useDispatch } from 'react-redux';
import { messagesSlice } from '../../../redux/message/messageSlice';
import './MessageList.css';

function MessageList() {

  const messageList = useSelector((state) => {
    console.log(state);
    return state.entities
  })
  const dispatch = useDispatch()

  const { sendMessage, readyState, getWebSocket } = useWebSocket('ws://localhost:8000', {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    onMessage: (message) => {
      console.log("message received", message)
    }
  });

  // let sendMessageToWs = () => {
  //   let msg = {
  //     user: "brij",
  //     group: "it",
  //     content: currentMsg
  //   }
  // }

  return (
    <div className='center'>
      <div>MessageList</div>
      <div className='chatbox'>
      {/* {
        messageList.map((message, index) => {
          return (
          <div key={index}>
            <span>User: {message.user}</span>
            <span>Group: {message.group}</span>
            <span>Message: {message.content}</span>
          </div>
          )
        })
      } */}
      {messageList}
      </div>
      {/* <div>
        <input onChange={(event) => {setCurrentMsg(event.target.value)}} />
        <button onClick={sendMessage}>Send</button>
      </div> */}
    </div>
  )
}

export default MessageList