require('dotenv').config()
const express = require('express');
const http = require('http');
const { router: messageRoute } = require("./routes");
const cors = require('cors');

const socketio = require('socket.io');
const { socketConnection } = require('./socket');

const mongoose = require('mongoose');
const { connectDb } = require('./config/dbConnection');

const port = process.env.PORT || 8000;

const app = express();
connectDb();
app.use(cors())
app.use("/api",messageRoute);

const server = http.createServer(app);
const io = socketio(server,{
  cors: {
    origin: "http://localhost:3006",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  }
});

mongoose.connection.once('open', async () => {
  await socketConnection(io);
  server.listen(port, (err) => {
      if (err) console.log(err);
      console.log(`server listening on ${port}`);
  });
})

process.on("uncaughtException", (err) => {
  console.error("uncaughtException", err);
  process.exit(1);
})

