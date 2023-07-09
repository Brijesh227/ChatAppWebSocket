const ws = require('ws');
const { createMessage } = require('../controllers/message');

exports.socketConnection = async function (server) {
  const wsServer = new ws.Server({ noServer: true });
  wsServer.on('connection', socket => {

    console.log("webscocket connection",socket);

    socket.on('error', error => {
      console.log("error",error);
    });

    socket.on('message', async (message) => {
      await createMessage(message);
      wsServer.clients.forEach(client => {
        if(client !== socket && client.readyState === WebSocket.OPEN && message.groupName === client.groupName) {
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
}