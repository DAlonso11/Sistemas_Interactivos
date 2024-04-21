
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
const QRCode = require('qrcode');
app.use(express.static(__dirname + '/apps'));



/* ========== FUNCIONES GET ========== */

// Cliente
app.get('/www_cliente/registro', function(req, res,next) {
    res.sendFile(__dirname + '/apps/www_cliente/registro.html');
});
app.get('/www_cliente/cesta', function(req, res,next) {
    res.sendFile(__dirname + '/apps/www_cliente/cesta.html');
});
app.get('/www_cliente/compras', function(req, res,next) {
    res.sendFile(__dirname + '/apps/www_cliente/compras.html');
});
app.get('/www_cliente/escaner', function(req, res,next) {
    res.sendFile(__dirname + '/apps/www_cliente/escaner.html');
});
app.get('/www_cliente/favoritos', function(req, res,next) {
    res.sendFile(__dirname + '/apps/www_cliente/favoritos.html');
});
app.get('/www_cliente/info', function(req, res,next) {
    res.sendFile(__dirname + '/apps/www_cliente/info.html');
});
app.get('/www_cliente/info', function(req, res,next) {
    res.sendFile(__dirname + '/apps/www_cliente/pagar.html');
});

// Tienda
app.get('/www_tienda/info', function(req, res,next) {
    res.sendFile(__dirname + '/apps/www_tienda/info.html');
});
app.get('/www_tienda/escaner', function(req, res,next) {
    res.sendFile(__dirname + '/apps/www_tienda/escaner.html');
});
app.get('/www_tienda/estadisticas', function(req, res,next) {
    res.sendFile(__dirname + '/apps/www_tienda/estadisticas.html');
});
app.get('/www_tienda/pedidos', function(req, res,next) {
    res.sendFile(__dirname + '/apps/www_tienda/pedidos.html');
});
app.get('/www_tienda/perfil', function(req, res,next) {
    res.sendFile(__dirname + '/apps/www_tienda/perfil.html');
});



/* ========== FUNCIONES DE EVENTOS ========== */

// Funcion que conecta cliente
function handleJoin(client, data) {
    console.log(data);
}

// Funcoin que gestiona la alerta

function handleAlert(client, name) {
    io.emit("alert", name);
}

function handleAlertFinish(client, name) {
    io.emit("alertFinish", name);
}

// Funcion que filtra los items en los json
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

// Funcion que añade un nuevo producto a un json
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

// Funcion que borra un producto de un json
function handleDeleteProduct(client, name, id, file) {
    fs.readFile(__dirname + '/' + file +'.json', 'utf8', function(err, data) {
        if (err) {
            console.error("Error reading carritos.json:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        var diccionarios = JSON.parse(data); 
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

// Funcion que envia productos.json
function handleProductos(client) {
    fs.readFile(__dirname + '/productos.json', 'utf8', function(err, data) {
        if (err) {
            console.error("Error reading productos.json:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        const productos = JSON.parse(data);
        io.emit("productos", productos);
    });
}

// Funcion que envia pedidos.json
function handlePedidos(client) {
    fs.readFile(__dirname + '/pedidos.json', 'utf8', function(err, data) {
        if (err) {
            console.error("Error reading pedidos.json:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        const pedidos = JSON.parse(data);
        io.emit("pedidos", pedidos);
    });
}

// Funcion que crea un pedido
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

// Funcion que devuelve el codigo del ultimo pedido del json
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

// Funcion que al recargar la pagina enseña el ultimo pedido
function handleUltimoPedido(client, name) {
    fs.readFile(__dirname + '/pedidos.json', 'utf8', function(err, data) {
        if (err) {
            console.error("Error reading pedidos.json:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        const lista = JSON.parse(data);
        const newlist = lista.filter(element => element.cliente === name);
        let ultimopedido = newlist[newlist.length -1];
        io.emit("ultimoPedido", ultimopedido);
    });
}

// Cambia el estado del pedido
function handleEstadoPedido(client, codigo, estado) {
    fs.readFile(__dirname + '/pedidos.json', 'utf8', function(err, data) {
        if (err) {
            console.error("Error reading pedidos.json:", err);
            res.status(500).send("Error interno del servidor");
            return;
        }
        const lista = JSON.parse(data);
        const newlist = lista.find(element => element.pedido === codigo);
        newlist.estado = estado;
        const index = lista.findIndex(element => element.pedido === codigo);
        lista.splice(index, 1, newlist);
        fs.writeFile(__dirname + '/pedidos.json', JSON.stringify(lista), err => {
            if (err){
                console.error("Error writing pedidos.json:", err);
        }});
        io.emit("estadoPedido", 0);
    });
}

// Funcion borra un item del carrito de un cliente
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

// Funcion que devuelve usuarios.json
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

// Funcion que añade un nuevo usuario a usuarios.json
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
        io.emit("new_usuario", 0);
    });
}

// Funcion que genera el qr de un pedido
async function handleQRgenerator(client, codigo) {
    try {
        const qrCodeData = await QRCode.toDataURL(codigo);
        const base64Data = qrCodeData.replace(/^data:image\/png;base64,/, '');

        const directorio = './apps/www_cliente/QR_pedidos';

        if (!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio);
        }

        fs.writeFileSync(`${directorio}/${codigo}.png`, base64Data, 'base64');
        io.emit("QRgenerator", 0);

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

    client.on('alert', function(name) {
        handleAlert(client, name);
    });

    client.on('alertFinish', function(name) {
        handleAlertFinish(client, name);
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

    client.on('pedidos', function() {
        handlePedidos(client);
    });
    
    client.on('crearPedido', function(pedido) {
        handleCrearPedido(client, pedido);
    });

    client.on("numPedido", function() {
        handleNumPedido(client);
    });

    client.on("ultimoPedido", function(name) {
        handleUltimoPedido(client, name);
    });

    client.on("estadoPedido", function(codigo, estado) {
        handleEstadoPedido(client, codigo, estado);
    })

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


/* ========== PUERTO ========== */

server.listen(5500);

