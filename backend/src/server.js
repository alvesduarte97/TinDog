const express = require("express");
//mongosse deve ser importado antes das rotas
const mongoose = require("mongoose");

const cors = require("cors");

const routes = require("./routes");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const connectedUsers = {};

io.on("connection", socket => {
    const { user } = socket.handshake.query;
        
    console.log(user, socket.id);

    connectedUsers[user] = socket.id;
});

mongoose.connect(
  "mongodb+srv://tinderdev:tinderdev@cluster0-kfnbw.mongodb.net/omnistack8?retryWrites=true&w=majority",
  {
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

//O use para cors deve estar antes das routes
app.use(cors());
//Este comando estou falando ao express que a minha maneira de comunicação é usando o JSON
//deve ser executado antes de reconhecer as rotas
app.use(express.json());

app.use(routes);

server.listen(3333);
