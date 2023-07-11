require('dotenv').config()
const { createMessage } = require('../controllers/message');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 3000;
const activeUserList = [];

exports.socketConnection = async function (server) {
  try {
    io.on('connection', socket => {
      socket.on('joinRoom', ({ userName, groupName }) => {
        const user = {
          id: socket.id,
          userName: userName,
          groupName: groupName
        };
        activeUserList.push(user);

        socket.join(user.groupName);
    
        io.to(user.groupName).emit('roomUsers', {
          room: user.groupName,
          users: activeUserList.filter(activeUser => activeUser.groupName === user.groupName)
        });
      });
    
      socket.on('chatMessage', msg => {
        const user = getActiveUser(socket.id);
    
        io.to(user.room).emit('message', formatMessage(user.username, msg));
      });
    
      socket.on('disconnect', () => {
        const user = exitRoom(socket.id);
    
        if (user) {
          io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getIndividualRoomUsers(user.room)
          });
        }
      });
    });

    server.listen(PORT, () => {
      console.log(`Server running on ${PORT}`)
    });

  } catch(error) {
    console.log("error from server",error)
  }
}