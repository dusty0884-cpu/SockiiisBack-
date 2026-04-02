const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);

// This sets the port for your global URL
const PORT = process.env.PORT || 3000;

// This serves your app files
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// This handles the livestream data flow
io.on('connection', (socket) => {
  console.log('User connected to SockiiisBack stream');
  
  socket.on('stream', (data) => {
    // This broadcasts the video data to everyone watching global
    socket.broadcast.emit('stream', data);
  });
});

http.listen(PORT, () => {
  console.log(`SockiiisBack is live at port ${PORT}`);
});
