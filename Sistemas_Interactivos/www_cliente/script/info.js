var socket = io.connect('http://localhost:5500');
  socket.on('connect', function(data) {
      socket.emit('join', 'Hello World from client info');
  });