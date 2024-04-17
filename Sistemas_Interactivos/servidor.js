
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



/* FUNCIONES DE EVENTOS */

function handleJoin(client, data) {
    console.log(data);
}

function handleFilterJson(client, name, file) {
    fs.readFile(__dirname + '/' + file +'.json', 'utf8', function(err, data) {
        if (err) {
            console.error("Error reading pedidos.json:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        const lista = JSON.parse(data);
        /* AQUI HABRIA QUE FILTRARLO POR NOMBRE */
        const newlist = lista.filter(element => element.cliente === name);
        console.log(lista);
        console.log(newlist)
        io.emit("filterJSON", newlist);
    });
}

function handleNewProduct(client, id, name, file) {
    fs.readFile(__dirname + '/' + file +'.json', 'utf8', function(err, data) {
        if (err) {
            console.error("Error reading carritos.json:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        var carritos = JSON.parse(data); //cambiar nombre
        var carrito_name = carritos.find(element => element.cliente === name);
        const index = carritos.findIndex(element => element.cliente === name);
        carrito_name.items.push(id);
        carritos.splice(index, 1, carrito_name);

        fs.writeFile(__dirname + '/' + file +'.json', JSON.stringify(carritos), err => {
            if (err){
                console.error("Error writing carritos.json:", err);
        }});
        io.emit("new_product", 0);
    });
}

function handleDeleteProduct(client, name, id, file) {
    fs.readFile(__dirname + '/' + file +'.json', 'utf8', function(err, data) {
        if (err) {
            console.error("Error reading carritos.json:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        var carritos = JSON.parse(data); //cambiar nombre
        var carrito_name = carritos.find(element => element.cliente === name);
        const index = carritos.findIndex(element => element.cliente === name);
        carrito_name.items.splice(index, 1);

        fs.writeFile(__dirname + '/' + file +'.json', JSON.stringify(carritos), err => {
            if (err){
                console.error("Error writing carritos.json:", err);
        }});
        io.emit("delete_product", 0);
    });
}

function handleProductos(client) {
    fs.readFile(__dirname + '/productos.json', 'utf8', function(err, data) {
        if (err) {
            console.error("Error reading pedidos.json:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        const productos = JSON.parse(data);
        io.emit("productos", productos);
    });
}

function handleCrearPedido(client, pedido) {
    fs.readFile(__dirname + '/pedidos.json', 'utf8', function(err, data) {
        if (err) {
            console.error("Error reading pedidos.json:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        const pedidos = JSON.parse(data);
        pedidos.push(pedido);
        fs.writeFile(__dirname + '/pedidos.json', JSON.stringify(pedidos), err => {
            if (err){
                console.error("Error writing pedidos.json:", err);
        }});
        io.emit("crearPedidos", 0);
    });
}

function handleNumPedido(client) {
    fs.readFile(__dirname + '/pedidos.json', 'utf8', function(err, data) {
        if (err) {
            console.error("Error reading pedidos.json:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        const pedidos = JSON.parse(data);
        var l = pedidos.length;
        io.emit("crearPedido", pedidos[l-1].pedido );
    });
}

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
      handleJoin(client, data);
    });

    client.on('filterJSON', function(name, file) {
        handleFilterJson(client, name, file);
    });

    client.on('new_product', function(id, name, file) {
        handleNewProduct(client, id, name, file);
    });

    client.on('delete_product', function(name, id, file) {
        handleDeleteProduct(client, name, id, file);
    })

    client.on('productos', function() {
        handleProductos(client);
    });
    
    client.on('crearPedido', function(pedido) {
        handleCrearPedido(client, pedido);
    });

    client.on("numPedido", function() {
        handleNumPedido(client);
    })
});



server.listen(5500);

