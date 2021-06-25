const exp = require("constants");
const express = require("express");
const app = express();
const http = require("http").createServer(app);

const port = process.env.PORT || 3000;


http.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})

app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');    
})

// app.listen(port,(req,res)=>{
//     console.log("Server is working");
// })

// Socket 

const io = require('socket.io')(http);

io.on('connection', (socket)=>{
    console.log('connected');
    socket.on('message',(msg)=>{
        console.log(msg);
        socket.broadcast.emit('message',msg)
    })
})