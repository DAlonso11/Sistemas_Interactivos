
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
app.use(express.static(__dirname + '/www_cliente'));



app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/www_cliente/registro.html');
});
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/www_cliente/script/info.js');
});
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/www_cliente/cesta.html');
});
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/www_cliente/compras.html');
});
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/www_cliente/escaner.html');
});
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/www_cliente/favoritos.html');
});
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/www_cliente/info.html');
});
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/www_cliente/pagar.html');
});

io.on('connection', function(client) {
    console.log('Client connected...');
    client.on('join', function(data) {
      console.log(data);
    });
    client.on('pedidos', function() {
        console.log("1");
        fs.readFile(__dirname + '/pedidos.json', 'utf8', function(err, data) {
            if (err) {
                console.error("Error reading pedidos.json:", err);
                res.status(500).send("Error interno del servidor");
                return;
            }
            const pedidos = JSON.parse(data);
            /* AQUI HABRIA QUE FILTRARLO POR NOMBRE */
            console.log(pedidos);
            io.emit("pedidos", pedidos);
        });
    });
});



server.listen(5500);

