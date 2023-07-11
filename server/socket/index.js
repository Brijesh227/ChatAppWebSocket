const { createMessage } = require('../controllers');
const activeUserList = [];

exports.socketConnection = async function (io) {
  try {
    io.on('connection', socket => {
      socket.on('join', ({ userName, groupName }) => {
        console.log("connection established!");
        const user = {
          id: socket.id,
          userName: userName,
          groupName: groupName
        };
        activeUserList.push(user);

        socket.join(user.groupName);
        socket.on("sendMessage", async ({ message }) => {
          const messageObject = JSON.parse(message);
          await createMessage(messageObject);
          io.to(user.groupName).emit("message", {
            user: user.userName,
            text: messageObject.messageText,
          });
        });
      });

      socket.on('disconnect', () => {
        const index = activeUserList.findIndex((user) => user.id === socket.id);
        if (index !== -1) {
          activeUserList.splice(index, 1);
        }
        console.log("connection closed from user!");
      });
    });
  } catch (error) {
    console.log("error from server", error)
  }
}