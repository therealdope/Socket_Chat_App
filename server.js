//npm install express socket.io
//npm init -y
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 5500;

// Serve the first HTML file to Client 1
app.get('/client1', (req, res) => {
    res.sendFile(__dirname + '/client1.html');
});

// Serve the second HTML file to Client 2
app.get('/client2', (req, res) => {
    res.sendFile(__dirname + '/client2.html');
});

// Handle socket connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for incoming messages
    socket.on('message', (msg) => {
        console.log('Received: ' + msg);
        socket.broadcast.emit('message', msg); // Broadcast the message to all other clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
