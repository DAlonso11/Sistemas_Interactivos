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

var carritos = [
    {
        "cliente": "Marta Perez",
        "items": [13]
    },
    {
        "cliente": "Jorge Ramirez",
        "items": []
    },
    {
        "cliente": "Francisco Garcia",
        "items": []
    }
]

var mi_carrito = [
    {
        "id" : 13,
        "category": "Joyeria",
        "name" : "Pendientes pequeños de aro de plata 925 bañada en oro amarillo de 18K con textura de bambú",
        "brand" : "Aristocrazy",
        "size" : "Unitalla",
        "price" : "85,00€"
    }
]

mi_carrito =[]
/* FUNCION PARA RECUPERAR LOS PRODUCTOS */

/* FUNCION PARA RECUPERAR CARRITOS */


/* FUNCION PARA ENCONTRAR EL CARRITO DEL CLIENTE DE INICIO DE SESIÓN */

/* FUNCION PARA ENCONTRAR EL CARRITO DEL CLIENTE DE INICIO DE SESIÓN */
function obtenerCarritoDesdeCookie() {
    var clienteCookie = "";
    var carritoCliente = [];

    // Obtener el valor de la cookie "cliente"
    var cookie = document.cookie;
    console.log("cookie: ", cookie);
    var cookieItems = cookie.split(';');
    cookieItems.forEach(function(item) {
        var parts = item.trim().split('=');
        if (parts[0] === "username") {
            clienteCookie = parts[1];
        }
    });
    console.log("clienteCookie: ", clienteCookie); // Agregado para depurar
    
    // Encontrar el carrito del cliente
    var carritoCliente = carritos.find(function(carrito) {
        return carrito.cliente === clienteCookie;
    });
    
    console.log("carritoCliente: ", carritoCliente); // Agregado para depurar

    // Si no se encuentra el carrito del cliente, retornar un mensaje
    if (!carritoCliente) {
        console.log("El cliente no tiene ningún artículo en su carrito.");
        return [];
    }

    // Encontrar los productos correspondientes a los IDs en el carrito
    var productosEnCarrito = carritoCliente.items.map(function(itemId) {
        return productos.find(function(producto) {
            return producto.id === itemId;
        });
    });

    return productosEnCarrito; // Devolver el carrito encontrado
}

// Uso de la función para obtener el carrito del cliente desde la cookie
mi_carrito = obtenerCarritoDesdeCookie();
console.log(mi_carrito);




/* FUNCION QUE AÑADE ITEMS FAVORITOS DEL CLIENTE EN DIVS */
function renderItems(items) {
    var List = document.getElementById('items-list');
    
    // Limpiar el contenedor antes de renderizar los elementos nuevamente
    List.innerHTML = '';

    items.forEach(function(item) {
        var itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        var itemDetailsDiv = document.createElement('div');
        itemDetailsDiv.classList.add('item-details');

        var itemNameDiv = document.createElement('div');
        itemNameDiv.classList.add('item-name');
        itemNameDiv.textContent = item.name;

        var messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.textContent = item.name;

        var itemBrandDiv = document.createElement('div');
        itemBrandDiv.classList.add('item-brand');
        itemBrandDiv.textContent = item.brand;

        var itemSizeDiv = document.createElement('div');
        itemSizeDiv.classList.add('item-size');
        itemSizeDiv.textContent = "Talla: " + item.size;

        var itemPriceDiv = document.createElement('div');
        itemPriceDiv.classList.add('item-price');
        itemPriceDiv.textContent = item.price;

        itemDetailsDiv.appendChild(itemNameDiv);
        itemDetailsDiv.appendChild(messageDiv); // Agregar el elemento de mensaje aquí
        itemDetailsDiv.appendChild(itemBrandDiv);
        itemDetailsDiv.appendChild(itemSizeDiv);
        itemDetailsDiv.appendChild(itemPriceDiv);

        var itemPhotoDiv = document.createElement('div');
        itemPhotoDiv.classList.add('item-photo');

        var itemPhotoImg = document.createElement('img');
        itemPhotoImg.classList.add('item-photo-img');
        itemPhotoImg.src = "../images/" + item.name + ".png";
        itemPhotoImg.alt = item.name;

        itemPhotoDiv.appendChild(itemPhotoImg);
        
        // Almacenar el ID del artículo actual
        var currentItemId = item.id;

        itemDiv.appendChild(itemDetailsDiv);
        itemDiv.appendChild(itemPhotoDiv);

        List.appendChild(itemDiv);
    });
}

/* ========== ONLOAD ========== */
window.onload = function() {
    renderItems(mi_carrito);
};