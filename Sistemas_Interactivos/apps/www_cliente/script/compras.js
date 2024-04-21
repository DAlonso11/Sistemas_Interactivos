/* ========== CONECTAR CON EL SERVIDOR ========== */

var socket = io.connect('http://localhost:5500');
  socket.on('connect', function(data) {
      socket.emit('join', 'Hello World from compras');
  });

/* ========== COOKIE ========== */

function getCookie(nombre) {
    var cookies = document.cookie.split('; ');
    
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split('=');
        if (cookie[0] === nombre) {
            return decodeURIComponent(cookie[1]); 
        }
    }
    return null;
}

/* ========== FUNCION PARA RECUPERAR LOS PEDIDOS ========== */

var productos = [];
var pedidos = [];
var ordersData = [];

/* ========== RECUPERAR LOS PRODUCTOS ========== */

// Solicitar la lista de pedidos al servidor
socket.emit('productos');

// Manejar la respuesta del servidor
socket.on('productos', function(pdct) {
    pdct.forEach(elemento => {
        productos.push(elemento);
    });
});

/* ========== RECUPERAR LOS PEDIDOS ========== */
var cookiename = getCookie("username");
socket.emit('filterJSON', cookiename, "pedidos");

// Manejar la respuesta del servidor
socket.on('filterJSON', function(c) {
    c.forEach(elemento => {
        ordersData.push(elemento);
    });
    if (ordersData.length > 0) {
        var mis_items = []
        ordersData[0].items.forEach(i => {
            var articulo = productos.find(element => element.id === i);
            mis_items.push(articulo);
        });
        renderOrders();
        ordersData = mis_items;
        console.log("Orders Data: ", ordersData);
    }
});


/* ========== FUNCION PARA ENCONTRAR LOS PEDIDOS DEL CLIENTE DE INICIO DE SESIÓN ========== */
function actualizarPedidosDesdeCookie() {
    var cookie = document.cookie;
    var clienteCookie = "";
    var pedidosCliente = [];

    // Buscar el valor de la cookie "cliente"
    /* HE PUESTO UNA FUNCOIN PARA SACAR EL NOMBRE DE LA COOKIE ARRIBA, YA ESTA DEFINIDO EL NOMBRE */
    var cookieItems = cookie.split(';');
    cookieItems.forEach(function(item) {
        var parts = item.trim().split('=');
        if (parts[0] === "username") {
            clienteCookie = parts[1];
        }
    });

    // Buscar los pedidos del cliente en la lista de pedidos
    pedidos.forEach(function(pedido) {
        if (pedido.cliente === clienteCookie) {
            pedidosCliente.push(pedido);
        }
    });

    // Limpiar la lista ordersData
    ordersData = [];

    // Copiar los pedidos del cliente encontrados a ordersData
    pedidosCliente.forEach(function(pedido) {
        ordersData.push(pedido);
    });

    console.log("Pedidos actualizados desde la cookie:", ordersData);
}


/* ========== FUNCIONAMIENTO ========== */

/*  FUNCION QUE RECIBE EL PEDIDO PARA BUSCAR EN LISTAS Y RELLENAR EL POP-UP */
function showDetails(pedido) {
    // Buscar el pedido en ordersData
    var order = ordersData.find(function(item) {
        return pedido === pedido;
    });

    // Limpiar el contenido actual del pop-up
    var itemsList = document.getElementById("items-list");
    itemsList.innerHTML = "";

    // Actualizar el número de pedido en el pop-up
    var orderIdDiv = document.getElementById("order-id");
    orderIdDiv.innerHTML = "<b>Numero de pedido: " + pedido + "</b>";

    // Cambiar la imagen del código QR
    var qrImage = document.getElementById("qr-image");
    qrImage.innerHTML = '<img class="qr-img" src="QR_pedidos/' + pedido + '.png" alt="QR pedido">';


    // Buscar los detalles de los items en productos y agregarlos al pop-up
    ordersData.forEach(function(item) {

        // Hacer div item
        var itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        var itemDetailsDiv = document.createElement("div");
        itemDetailsDiv.classList.add("item-details");

        var itemNameDiv = document.createElement("div");
        itemNameDiv.classList.add("item-name");
        itemNameDiv.textContent = item.name;
        itemDetailsDiv.appendChild(itemNameDiv);

        var messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.textContent = item.name;
        itemDetailsDiv.appendChild(messageDiv);

        var itemBrandDiv = document.createElement("div");
        itemBrandDiv.classList.add("item-brand");
        itemBrandDiv.textContent = "Marca: " + item.brand;
        itemDetailsDiv.appendChild(itemBrandDiv);

        var itemSizeDiv = document.createElement("div");
        itemSizeDiv.classList.add("item-size");
        itemSizeDiv.textContent = "Talla: " + item.size;
        itemDetailsDiv.appendChild(itemSizeDiv);

        var itemPriceDiv = document.createElement("div");
        itemPriceDiv.classList.add("item-price");
        itemPriceDiv.textContent = "Precio: " + item.price;
        itemDetailsDiv.appendChild(itemPriceDiv);

        itemDiv.appendChild(itemDetailsDiv);

        var itemPhotoDiv = document.createElement("div");
        itemPhotoDiv.classList.add("item-photo");

        var itemPhotoImg = document.createElement("img");
        itemPhotoImg.classList.add("item-photo-img");
        itemPhotoImg.src = "./style/images/" + item.name + ".png";
        itemPhotoImg.alt = item.name;
        itemPhotoDiv.appendChild(itemPhotoImg);

        itemDiv.appendChild(itemPhotoDiv);

        itemsList.appendChild(itemDiv);
    });

    // Mostrar el pop-up
    var detailsPopup = document.getElementById("details-pop-up");
    detailsPopup.style.display = "grid";
}


/* FUNCION QUE AÑADE LOS PEDIDOS DEL CLIENTE EN DIVS */

function renderOrders() {
    var ordersList = document.getElementById("orders-list");
    console.log("renderOrders orderData: ", ordersData);
    ordersData.forEach(function(order) {
        console.log("oder: ", order);
        var orderDetails = document.createElement("div");
        orderDetails.classList.add("order-details");

        var orderText = document.createElement("b");
        orderText.textContent = "Pedido " + order.pedido;
        orderDetails.appendChild(orderText);
        orderDetails.appendChild(document.createElement("br"));

        var estadoText = document.createElement("span");
        if (order.estado === "Recogido en tienda") {
            estadoText.textContent = "Estado: Recogido en tienda el día " + order.fecha;
        } else if (order.estado === "Entregado") {
            estadoText.textContent = "Estado: Entregado el día " + order.fecha;
        } else {
            estadoText.textContent = "Estado: " + order.estado;
        }
        orderDetails.appendChild(estadoText);
        orderDetails.appendChild(document.createElement("br"));

        if (order.llegada !== "-") {
            var llegadaText = document.createElement("span");
            llegadaText.textContent = "Llegada: Entre las ";
            if (order.llegada === "mañana") {
                llegadaText.textContent += "08:00 y las 12:00";
            } else if (order.llegada === "tarde") {
                llegadaText.textContent += "17:00 y las 19:00";
            }
            orderDetails.appendChild(llegadaText);
            orderDetails.appendChild(document.createElement("br"));
        }

        var detallesButton = document.createElement("button");
        detallesButton.textContent = "Ver detalles aquí";
        detallesButton.onclick = function() {
            // Aquí llamamos a la función showDetails con el número de pedido
            console.log("order.pedido: ", order.pedido);
            showDetails(order.pedido);
        };
        orderDetails.appendChild(detallesButton);
        orderDetails.appendChild(document.createElement("br"));

        ordersList.appendChild(orderDetails);
    });
}

/* ========== ONLOAD ========== */
window.onload = function() {
    actualizarPedidosDesdeCookie();
    renderOrders();
};




