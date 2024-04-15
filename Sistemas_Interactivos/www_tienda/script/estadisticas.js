/* ========== CARGAR JSONs ========== */

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
        "items": [1,1,1,1,2]
    },
    {
        "cliente": "Marta Perez",
        "pedido": "434280J",
        "estado": "En reparto",
        "llegada": "tarde",
        "fecha": "11/3/2024",
        "items": [3,3,3,3,3,3]
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
        "estado": "Recogido en tienda",
        "llegada": "-",
        "fecha": "28/3/2024",
        "items": [4,10,10,10]
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
        "items": [1,5,6]
    }
]

/* ========== TOP VENTAS ========== */

// Función para calcular los productos más vendidos
function obtenerProductosMasVendidos(pedidos) {
    // Objeto para almacenar la cantidad vendida de cada producto
    var cantidadVendida = {};

    // Iterar sobre cada pedido
    pedidos.forEach(function(pedido) {
        // Iterar sobre cada item en el pedido
        pedido.items.forEach(function(itemId) {
            // Incrementar la cantidad vendida del producto correspondiente
            cantidadVendida[itemId] = (cantidadVendida[itemId] || 0) + 1;
        });
    });

    // Inicializar un array para almacenar los productos más vendidos
    var productosMasVendidos = [];

    // Iterar sobre los productos y calcular la cantidad vendida para cada uno
    productos.forEach(function(producto) {
        var cantidad = cantidadVendida[producto.id] || 0;
        // Agregar el producto al array de productos más vendidos
        productosMasVendidos.push({
            id: producto.id,
            cantidad: cantidad,
            detalles: producto
        });
    });

    // Ordenar el array de productos más vendidos por cantidad vendida en orden descendente
    productosMasVendidos.sort(function(a, b) {
        // Si la cantidad vendida es la misma, ordenar por ID del producto
        if (b.cantidad === a.cantidad) {
            return b.id - a.id; // Ordenar por ID en orden descendente
        }
        return b.cantidad - a.cantidad; // Ordenar por cantidad vendida en orden descendente
    });

    // Obtener los detalles de los 3 productos más vendidos
    var topProductos = productosMasVendidos.slice(0, 3).map(function(producto) {
        return producto.detalles;
    });

    return topProductos;
}

// Obtener los detalles de los 3 productos más vendidos
var productosMasVendidos = obtenerProductosMasVendidos(pedidos);
console.log("TOP VENTAS: ", productosMasVendidos);


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

window.onload = function() {
    renderItems(productosMasVendidos);
};

/* ========== GRAFICO VENTAS ========== */

// Datos de ejemplo: ventas mensuales del último año
var ventas = {
    enero: 1200,
    febrero: 1400,
    marzo: 1600,
    abril: 1800,
    mayo: 2000,
    junio: 2200,
    julio: 2400,
    agosto: 2600,
    septiembre: 2800,
    octubre: 3000,
    noviembre: 3200,
    diciembre: 3400
};

// Obtener las etiquetas (meses) y los datos de ventas
var meses = Object.keys(ventas);
var datosVentas = Object.values(ventas);

// Obtener el elemento canvas del gráfico
var ctx = document.getElementById('myChart').getContext('2d');

// Crear el gráfico de líneas
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: meses,
        datasets: [{
            label: 'Ventas del último año',
            data: datosVentas,
            backgroundColor: 'rgb(227, 0, 0, 1)',
            borderColor: 'rgb(227, 0, 0, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});