/* ========== JSONs ========== */
var productos = [
    {
        "id" : 1,
        "category": "Mujer",
        "name" : "Bermuda Lino Serena",
        "brand" : "Polin et Moi",
        "size" : "M",
        "price" : "45,95€"
    },
    {
        "id" : 2,
        "category": "Mujer",
        "name" : "Blusa Blissful · Blanco",
        "brand" : "The-Are",
        "size" : "M",
        "price" : "49,95€"
    },
    {
        "id" : 3,
        "category": "Mujer",
        "name" : "Top asimétrico estampado tie dye soles",
        "brand" : "Brownie",
        "size" : "S",
        "price" : "35,90€"
    },
    {
        "id" : 4,
        "category": "Hombre",
        "name" : "Hoodie Classic Blanco Roto",
        "brand" : "Blue Banana",
        "size" : "L",
        "price" : "64,90€"
    },
    {
        "id" : 5,
        "category": "Hombre",
        "name" : "Polo Básico Calavera",
        "brand" : "Scalpers",
        "size" : "L",
        "price" : "64,90€"
    },
    {
        "id" : 6,
        "category": "Hombre",
        "name" : "Vaquero de hombre 502 ™ Taper",
        "brand" : "Levi's",
        "size" : "L",
        "price" : "120,00€"
    },
    {
        "id" : 7,
        "category": "Infantil",
        "name" : "Vestido dobby",
        "brand" : "Gocco",
        "size" : "5 años",
        "price" : "34,99€"
    },
    {
        "id" : 8,
        "category": "Infantil",
        "name" : "Camisa de niño de manga larga a rayas",
        "brand" : "Dadati",
        "size" : "7 años",
        "price" : "25,99€"
    },
    {
        "id" : 9,
        "category": "Infantil",
        "name" : "Ranita bebés sin manga gas",
        "brand" : "Coconut",
        "size" : "3-6 meses",
        "price" : "49,00€"
    },
    {
        "id" : 10,
        "category": "Zapatos",
        "name" : "Zapatillas Nike Dunk Low",
        "brand" : "Nike",
        "size" : "38",
        "price" : "129,99€"
    },
    {
        "id" : 11,
        "category": "Zapatos",
        "name" : "Zapatillas Adidas Samba",
        "brand" : "Adidas",
        "size" : "37",
        "price" : "120,00€"
    },
    {
        "id" : 12,
        "category": "Zapatos",
        "name" : "V-12 Leather White Steel",
        "brand" : "Veja",
        "size" : "39",
        "price" : "160,00€"
    },
    {
        "id" : 13,
        "category": "Joyeria",
        "name" : "Pendientes pequeños de aro de plata 925 bañada en oro amarillo de 18K con textura de bambú",
        "brand" : "Aristocrazy",
        "size" : "Unitalla",
        "price" : "85,00€"
    },
    {
        "id" : 14,
        "category": "Joyeria",
        "name" : "Pendientes Falling Dots L de aleación de metales bañados en oro",
        "brand" : "Singularu",
        "size" : "Unitalla",
        "price" : "17,99€"
    },
    {
        "id" : 15,
        "category": "Joyeria",
        "name" : "Collar Pandora Moments bañado en oro",
        "brand" : "Pandora",
        "size" : "Unitalla",
        "price" : "89,00€"
    },
    {
        "id" : 16,
        "category": "Casa",
        "name" : "Juego de sábanas Algodón 3 piezas - Basic Blanco",
        "brand" : "La Mallorquina",
        "size" : "Unitalla",
        "price" : "47,95€"
    },
    {
        "id" : 17,
        "category": "Casa",
        "name" : "Pack de 2 vasos de vidrio",
        "brand" : "H&M Home",
        "size" : "Unitalla",
        "price" : "9,99€"
    },
    {
        "id" : 18,
        "category": "Casa",
        "name" : "Set de 3 herméticos Clip & Close",
        "brand" : "Emsa",
        "size" : "Unitalla",
        "price" : "13,96€"
    }

]

var pedidos = [
    {
        "cliente": "Marta Perez",
        "pedido": "123456A",
        "estado": "Pendiente de envio",
        "llegada": "-",
        "fecha": "16/3/2024",
        "items": [1,2,3,4,5,13]
    },
    {
        "cliente": "Marta Perez",
        "pedido": "434280J",
        "estado": "En reparto",
        "llegada": "tarde",
        "fecha": "11/3/2024",
        "items": [3]
    },
    {
        "cliente": "Marta Perez",
        "pedido": "047229K",
        "estado": "Entregado",
        "llegada": "-",
        "fecha": "12/3/2024",
        "items": [18]
    },
    {
        "cliente": "Jorge Ramirez",
        "pedido": "993756J",
        "estado": "Pendiente de envio",
        "llegada": "-",
        "fecha": "28/3/2024",
        "items": [4,10]
    },
    {
        "cliente": "Jorge Ramirez",
        "pedido": "727891E",
        "estado": "En reparto",
        "llegada": "tarde",
        "fecha": "11/3/2024",
        "items": [17]
    },
    {
        "cliente": "Francisco Garcia",
        "pedido": "326402U",
        "estado": "Entregado",
        "llegada": "-",
        "fecha": "1/4/2024",
        "items": [5,6]
    }
]

var ordersData = [];


// loadProductos();

/* FUNCION PARA RECUPERAR LOS PEDIDOS PENDIENTES */

function actualizarPedidosPendientes() {
    // Filtrar los pedidos pendientes de envío
    ordersData = pedidos.filter(function(pedido) {
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


/* ========== ONLOAD ========== */
window.onload = function() {
    actualizarPedidosPendientes();
    renderOrders();
};





