/* ========== CONECTAR CON EL SERVIDOR ========== */

var socket = io.connect('http://localhost:5500');
  socket.on('connect', function(data) {
      socket.emit('join', 'Hello World from tienda estadisticas');
});

/* ========== CARGAR JSONs ========== */

var productos = [];
var pedidos_all = [];

socket.emit('productos');
socket.on('productos', function(pdct) {
    pdct.forEach(elemento => {
        productos.push(elemento);
    });
});

socket.emit('pedidos');

socket.on('pedidos', function(pdct) {
    pdct.forEach(elemento => {
        pedidos_all.push(elemento);
    });
    var productosMasVendidos = obtenerProductosMasVendidos(pedidos_all);
    console.log("TOP VENTAS: ", productosMasVendidos);
    renderItems(productosMasVendidos);
});

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
var productosMasVendidos = obtenerProductosMasVendidos(pedidos_all);
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
        itemPhotoImg.src = "../www_cliente/style/images/" + item.name + ".png";
        itemPhotoImg.alt = item.name;

        itemPhotoDiv.appendChild(itemPhotoImg);
        
        // Almacenar el ID del artículo actual
        var currentItemId = item.id;

        itemDiv.appendChild(itemDetailsDiv);
        itemDiv.appendChild(itemPhotoDiv);

        List.appendChild(itemDiv);
    });
}


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