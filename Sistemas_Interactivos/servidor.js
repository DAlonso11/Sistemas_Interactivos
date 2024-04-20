
var express = require('express');
var app = express();
var app2 = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
const QRCode = require('qrcode');
app.use(express.static(__dirname + '/www_cliente'));
app2.use(express.static(__dirname + '/www_tienda'));


/* ========== FUNCIONES GET ========== */

// Cliente
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/www_cliente/registro.html');
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

// Tienda
app2.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/www_tienda/escaner.html');
});
app2.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/www_tienda/estadisticas.html');
});
app2.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/www_tienda/info.html');
});
app2.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/www_tienda/pedidos.html');
});
app2.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/www_tienda/perfil.html');
});



/* ========== FUNCIONES DE EVENTOS ========== */

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

        if (carrito_name === undefined) {
            var new_carrito = {cliente: name, items: [id]};
            carritos.push(new_carrito);
        } else {
            const index = carritos.findIndex(element => element.cliente === name);
            carrito_name.items.push(id);
            carritos.splice(index, 1, carrito_name);
        }

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
        var diccionarios = JSON.parse(data); //cambiar nombre
        var mi_diccionario = diccionarios.find(element => element.cliente === name);
        
        var index = diccionarios.findIndex(element => element.cliente === name);
        var index_name = mi_diccionario.items.findIndex(element => element === id); //revisar bien

        mi_diccionario.items.splice(index_name, 1);

        if (mi_diccionario.items.length === 0) {
            diccionarios.splice(index, 1);
        } else {
            diccionarios.splice(index, 1, mi_diccionario);
        }

        fs.writeFile(__dirname + '/' + file +'.json', JSON.stringify(diccionarios), err => {
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
        io.emit("numPedido", pedidos[l-1].pedido );
    });
}

function handleDeleteCarrito(client, name) {
    fs.readFile(__dirname + '/carritos.json', 'utf8', function(err, data) {
        if (err) {
            console.error("Error reading carritos.json:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        const carritos = JSON.parse(data);
        let index = carritos.findIndex(element => element.cliente === name);
        if (index !== -1) {
            carritos.splice(index, 1);
            fs.writeFile(__dirname + '/carritos.json', JSON.stringify(carritos), err => {
                if (err){
                    console.error("Error writing carritos.json:", err);
            }});
            io.emit("deleteCarrito", 0);
        } else {
            io.emit("deleteCarrito", -1);
        }
    });
}

function handleUsuarios(cliente) {
    fs.readFile(__dirname + '/usuarios.json', 'utf8', function(err, data) {
        if (err) {
            console.error("Error reading usuarios.json:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        const usuarios = JSON.parse(data);
        io.emit("usuarios", usuarios);
    });
}

function handleNewUsuario(client, usuario) {
    fs.readFile(__dirname + '/usuarios.json', 'utf8', function(err, data) {
        if (err) {
            console.error("Error reading usuarios.json:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        var usuarios = JSON.parse(data); 
        usuarios.push(usuario);

        fs.writeFile(__dirname + '/usuarios.json', JSON.stringify(usuarios), err => {
            if (err){
                console.error("Error writing usuarios.json:", err);
        }});
        io.emit("new_user", 0);
    });
}

async function handleQRgenerator(client, codigo) {
    try {
        // Generar el código QR
        const qrCodeData = await QRCode.toDataURL(codigo);
        const base64Data = qrCodeData.replace(/^data:image\/png;base64,/, '');

        // Directorio donde guardar los archivos PNG
        const directorio = './www_cliente/QR_pedidos';

        // Asegurarse de que el directorio exista, si no, crearlo
        if (!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio);
        }

        // Guardar el código QR en un archivo PNG
        fs.writeFileSync(`${directorio}${codigo}.png`, base64Data, 'base64');

    } catch (error) {
        console.error(`Error al generar el código QR para "${codigo}":`, error);
    }
}

/* ========== CONEXIONES ========== */

io.on('connection', function(client) {
    console.log('Client connected...');

    client.on('join', function(data) {
      handleJoin(client, data);
    });

    client.on('filterJSON', function(name, file) {
        handleFilterJson(client, name, file);
    });

    // Esto sirve para favoritos?
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
    });

    client.on('deleteCarrito', function(name) {
        handleDeleteCarrito(client, name)
    });

    client.on('usuarios', function() {
        handleUsuarios(client);
    });

    client.on('new_usuario', function(usuario) {
        handleNewUsuario(client, usuario);
    });

    client.on('QRgenerator', function(codigo) {
        handleQRgenerator(client, codigo);
    });

});



server.listen(5500);

