const ws = require('ws');
const { createMessage } = require('../controllers/message');

exports.socketConnection = async function (server) {
  try {
    const wsServer = new ws.Server({ noServer: true });
    wsServer.on('connection', socket => {
      socket.on('error', error => {
        console.log("error",error);
      });

      socket.on('message', async (message) => {
        const messageObject = JSON.parse(message.toString());
        console.log("received message",messageObject)
        await createMessage(messageObject);
        wsServer.clients.forEach(client => {
          if(client.readyState === WebSocket.OPEN && messageObject.groupName === client.groupName) {
            client.send(message.toString())
          }
        })
      });
    });

    await server.on('upgrade', (request, socket, head) => {
      wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
      });
    });
  } catch(error) {
    console.log("error from server",error)
  }
}