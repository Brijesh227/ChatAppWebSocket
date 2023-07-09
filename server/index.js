require('dotenv').config()
const { createServer } = require('http');

const mongoose = require('mongoose');
const { connectDb } = require('./config/dbConnection');

const { socketConnection } = require('./socket');
const port = process.env.PORT || 8000;

const server = createServer();
connectDb();

mongoose.connection.once('open', async () => {
  await socketConnection(server);
  server.listen(port, (err) => {
      if (err) console.log(err);
      console.log(`server listening on ${port}`);
  });
})

process.on("uncaughtException", (err) => {
  console.error("uncaughtException", err);
  process.exit(1);
})

