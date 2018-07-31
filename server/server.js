const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io =  socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user connected');

  socket.on('createMessage',(message)=>{      
    console.log('create message',message);
    io.emit('newMessage',{
      from:message.from,
      text:message.text,
      createdAt:new Date().getTime()
    });
  });
  socket.on('disconnect',()=>{
    console.log('user disconnected');
  });

});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
// const path = require('path');
// const express = require('express');

// const publicPath = path.join(__dirname + '/../public');
// const port = process.env.port || 3000;
// const app = express();

// app.use(express.static(publicPath));

// app.listen(port,()=>
//     {console.log(`running at port ${port}`);});
