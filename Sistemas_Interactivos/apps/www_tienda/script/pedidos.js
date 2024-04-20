/* ========== CONECTAR CON EL SERVIDOR ========== */

var socket = io.connect('http://localhost:5500');
  socket.on('connect', function(data) {
      socket.emit('join', 'Hello World from tienda pedidos');
});

/* ========== JSONs ========== */
var productos = []
var pedidos_all = []
var ordersData = [];

socket.emit('productos');
socket.on('productos', function(pdct) {
    pdct.forEach(elemento => {
        productos.push(elemento);
    });
    console.log("1", productos);
});

socket.emit('pedidos');
socket.on('pedidos', function(pdct) {
    pdct.forEach(elemento => {
        pedidos_all.push(elemento);
    });
    console.log("1", pedidos_all);
    actualizarPedidosPendientes();
    renderOrders();
});



/* FUNCION PARA RECUPERAR LOS PEDIDOS PENDIENTES */

function actualizarPedidosPendientes() {
    // Filtrar los pedidos pendientes de envío
    ordersData = pedidos_all.filter(function(pedido) {
        return pedido.estado === "Pendiente de envio";
    });

    console.log("Pedidos pendientes de envío:", ordersData);
}


/* ========== FUNCIONAMIENTO ========== */

/*  FUNCION QUE RECIBE EL PEDIDO PARA BUSCAR EN LISTAS Y RELLENAR EL POP-UP */
function showDetails(pedido) {
    // Buscar el pedido en ordersData
    var order = ordersData.find(function(item) {
        return item.pedido === pedido;
    });

    // Limpiar el contenido actual del pop-up
    var itemsList = document.getElementById("items-list");
    itemsList.innerHTML = "";

    // Actualizar el número de pedido en el pop-up
    var orderIdDiv = document.getElementById("order-id");
    orderIdDiv.innerHTML = "<b>Numero de pedido: " + order.pedido + "</b>";


    // Buscar los detalles de los items en productos y agregarlos al pop-up
    order.items.forEach(function(itemId) {
        var item = productos.find(function(item) {
            return item.id === itemId;
        });

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
        itemPhotoImg.src = "../www_cliente/style/images/" + item.name + ".png";
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

    ordersData.forEach(function(order) {
        var orderDetails = document.createElement("div");
        orderDetails.classList.add("order-details");

        var orderText = document.createElement("b");
        orderText.textContent = "Pedido " + order.pedido;
        orderDetails.appendChild(orderText);
        orderDetails.appendChild(document.createElement("br"));

        var clienteText = document.createElement("span");
        clienteText.textContent = "Cliente: " + order.cliente;
        orderDetails.appendChild(clienteText);
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
            showDetails(order.pedido);
        };
        orderDetails.appendChild(detallesButton);
        orderDetails.appendChild(document.createElement("br"));

        ordersList.appendChild(orderDetails);
    });
}








