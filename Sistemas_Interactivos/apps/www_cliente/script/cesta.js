/* ========== CONECTAR CON EL SERVIDOR ========== */

document.getElementById("boton-pago").addEventListener("click", function() {
    window.location.href = "pagar.html";
})


var socket = io.connect('http://localhost:5500');
  socket.on('connect', function(data) {
      socket.emit('join', 'Hello World from client');
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

var mi_carrito = []
var productos = []

var ordenActual = 'nombre'; // Orden inicial por nombre
var opcionesOrden = ['nombre', 'precio', 'talla']; // Opciones de orden disponibles

/* ========== RECUPERAR LOS PRODUCTOS ========== */

// Solicitar la lista de pedidos al servidor
socket.emit('productos');

// Manejar la respuesta del servidor
socket.on('productos', function(pdct) {
    pdct.forEach(elemento => {
        productos.push(elemento);
    });
});

/* FUNCION PARA RECUPERAR CARRITOS */
var cookiename = getCookie("username");
socket.emit('filterJSON', cookiename, "carritos");

// Manejar la respuesta del servidor
socket.on('filterJSON', function(c) {
    c.forEach(elemento => {
        mi_carrito.push(elemento);
    });
    if (mi_carrito.length > 0) {
        var mis_items = []
        mi_carrito[0].items.forEach(i => {
            var articulo = productos.find(element => element.id === i);
            mis_items.push(articulo);
        });
        renderItems(mis_items);
    }
});

/* ========== FUNCION PARA ENCONTRAR EL CARRITO DEL CLIENTE DE INICIO DE SESIÓN ========== */

/* ========== FUNCION PARA ENCONTRAR EL CARRITO DEL CLIENTE DE INICIO DE SESIÓN ========== */


/* ========== FUNCION QUE AÑADE ITEMS FAVORITOS DEL CLIENTE EN DIVS ========== */

function renderItems(items) {
    var itemsOrdenados = ordenarProductos(items, ordenActual);

    var List = document.getElementById('items-list');
    
    // Limpiar el contenedor antes de renderizar los elementos nuevamente
    List.innerHTML = '';

    itemsOrdenados.forEach(function(item) {
        var itemDiv = document.createElement('div');
        itemDiv.id = 'item' + item.id;
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
        itemPhotoImg.src = "./style/images/" + item.name + ".png";
        itemPhotoImg.alt = item.name;

        itemPhotoDiv.appendChild(itemPhotoImg);
        
        // Almacenar el ID del artículo actual
        var ItemId = item.id;

        itemDiv.appendChild(itemDetailsDiv);
        itemDiv.appendChild(itemPhotoDiv);

        List.appendChild(itemDiv);

        removeOnSwipe(item)
    });
}

/* ========== ELIMINADO DE PRODUCTOS ========== */

// Función para detectar el deslizado a la derecha
function removeOnSwipe(item) {
    var productElement = document.getElementById('item' + item.id);
  
    let startX;
    let startY;
    let distX;
    let distY;
  
    productElement.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
    });
  
    productElement.addEventListener('touchmove', function(e) {
        if (!startX || !startY) {
            return;
        }
  
        const touch = e.touches[0];
        distX = touch.clientX - startX;
        distY = touch.clientY - startY;
  
        // Si el desplazamiento horizontal es mayor que el vertical, consideramos que es un deslizamiento horizontal
        if (Math.abs(distX) > Math.abs(distY)) {
            e.preventDefault(); // Evitar el desplazamiento vertical de la página
        }
    });
  
    productElement.addEventListener('touchend', function() {
        // Si el desplazamiento horizontal es positivo (hacia la derecha) y suficiente, eliminamos la tarea
        if (distX > 100) { // Ajusta el valor según sea necesario
            console.log("HELOOOOOO");
            remove(item);
        }
        startX = startY = distX = distY = 0;
    });
  }

//Función para eliminar producto
function remove(item) {
    console.log(item);
    const itemIdToRemove = item.id;
    console.log(mi_carrito[0].items)
    console.log(item)
    const itemIndex = mi_carrito[0].items.findIndex(items => items === itemIdToRemove);
        if (itemIndex !== -1) {
            mi_carrito[0].items.splice(itemIndex, 1);
            
            //Eliminarlo del json
            socket.emit("delete_product", cookiename, item.id, "carritos")
            socket.on('delete_product', function(res) {
                console.log(res);
                if (res === 0) {
                    console.log("Producto borrado");
                }
            });

            // Eliminar el producto del DOM  AQUI PONERSE DE ACUERDO CON LA LISTA DE FAVORITOS
            const productElement = document.getElementById('item'+itemIdToRemove);
            if (productElement) {
                productElement.remove();
            }

            console.log('Producto eliminado:', itemIdToRemove);
        }
  }

/* ========== ORDENADO DE PRODUCTOS ========== */

// Detección de doble toque
let lastTouchEnd = 0;
let doubleTapDelay = 300;

targetElement = document.getElementById("items-list");

targetElement.addEventListener('touchend', function(event) {
    let now = new Date().getTime();
    if (now - lastTouchEnd <= doubleTapDelay) {
        event.preventDefault();
        cambioOrden(event);
    }
    lastTouchEnd = now;
});

function cambioOrden(event) {
    document.getElementById("items-list").addEventListener('dblclick', function(e) {
        e.preventDefault();

        var currentIndex = opcionesOrden.indexOf(ordenActual);
    
        var nextIndex = (currentIndex + 1) % opcionesOrden.length;
    
        ordenActual = opcionesOrden[nextIndex];
    
        console.log("Orden cambiado a: ", ordenActual)
    
        renderItems(ordenarProductos(mi_carrito, ordenActual));
    });
}

function ordenarProductos(productos, criterio) {
    // Copiar la lista de productos para no modificar la original
    var productosOrdenados = productos.slice();

    // Comparador personalizado según el criterio de orden
    productosOrdenados.sort(function(a, b) {
        if (!a || !b) {
            return 0; // Manejo de valores no definidos o nulos
        }

        if (criterio === 'nombre') {
            if (a.name && b.name) {
                return a.name.localeCompare(b.name); // Ordenar por nombre
            }
        } else if (criterio === 'precio') {
            if (a.price && b.price) {
                // Convertir precios a números para ordenar adecuadamente
                var precioA = parseFloat(a.price.replace(',', '.'));
                var precioB = parseFloat(b.price.replace(',', '.'));
                return precioA - precioB; // Ordenar por precio
            }
        } else if (criterio === 'talla') {
            if (a.size && b.size) {
                return a.size.localeCompare(b.size); // Ordenar por talla
            }
        }

        return 0;
        
    });

    return productosOrdenados;
}

function buscarObjeto(transcript) {
    var objetosBuscar = [];

    if (mi_carrito.length == 0){
        console.log("El carrito está vacío")
    }

    else {
        mi_carrito[0].items.forEach(i => {
        var articulo = productos.find(element => element.id === i);
        objetosBuscar.push(articulo);
    });

    objetosBuscar.forEach(a => {
        var nombreArticulo = a.name.toUpperCase()
        if (transcript.toUpperCase() === nombreArticulo) {
            var objetoEncontrado = productos.find(element => element.id === a.id)
            renderItems([objetoEncontrado]);
            console.log("Correcto");
        }
    })
    }
}
 
// Iniciar reconocimiento de voz al hacer clic en el icono de micrófono
document.getElementById('micro-icon').addEventListener('click', function() {
    document.getElementById('micro-icon').style.display = 'grid';
    document.getElementById('micro-icon-voice').style.display = 'none';
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            // Crear un nuevo objeto SpeechRecognition
            var recognition = new window.webkitSpeechRecognition();

            // Idioma español y empezar a escuchar
            recognition.lang = 'es-ES';
            recognition.start();

            // Reconocer la voz y transcribir resultado
            recognition.onresult = function(event) {
                var transcript = event.results[0][0].transcript.trim().toUpperCase();

                buscarObjeto(transcript);
                recognition.stop();
            };

            // Manejar errores
            recognition.onerror = function(event) {
                alert('Error al reconocer el comando de voz. Por favor, intenta de nuevo.');
            };

            // Al detener reconocimiento parar el streaming de audio
            recognition.onend = function() {
                stream.getTracks().forEach(track => track.stop());
            };
            //document.getElementById('micro-icon').style.visibility = 'visible'
            //document.getElementById('micro-icon-voice').style.visibility = 'hidden'
        })
        .catch(function(error) {
            // Manejar errores
            alert('No se puede acceder al micrófono. Asegúrate de permitir el acceso.');
        });
});