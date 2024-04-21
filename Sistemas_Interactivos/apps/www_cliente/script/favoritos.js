/* ========== CONECTAR CON EL SERVIDOR ========== */

var socket = io.connect('http://localhost:5500');
  socket.on('connect', function(data) {
      socket.emit('join', 'Hello World from client favoritos');
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

/* ========== GET PRODUCTOS Y FAVORITOS ========== */

var fav_items_list = []
var productos = []

socket.emit('productos');

socket.on('productos', function(pdct) {
    pdct.forEach(elemento => {
        productos.push(elemento);
    });
});


var cookiename = getCookie("username");
socket.emit('filterJSON', cookiename, "favoritos");

// Manejar la respuesta del servidor
socket.on('filterJSON', function(c) {
    c.forEach(elemento => {
        fav_items_list.push(elemento);
    });
    if (fav_items_list.length > 0) {
        var mis_items = [];
        fav_items_list[0].items.forEach(i => {
            var articulo = productos.find(element => element.id === i);
            mis_items.push(articulo);
        });
        renderItems(mis_items);
    }
});

/* ========== UPDATE FAVORITOS ========== */

// SE ELIMINA UN FAVORITO


/* ========== FUNCIONAMIENTO ========== */

/* FUNCION QUE AÑADE ITEMS FAVORITOS DEL CLIENTE EN DIVS */
function renderItems(items) {

    if (items.lenght == 0) {
        console.log("Lista vacía")
    } else {
        var favList = document.getElementById('fav-list');
    
        // Limpiar el contenedor antes de renderizar los elementos nuevamente
        favList.innerHTML = '';

        items.forEach(function(item) {
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
            itemPhotoImg.src = "style/images/" + item.name + ".png";
            itemPhotoImg.alt = "Logo AppsKES";

            itemPhotoDiv.appendChild(itemPhotoImg);

            var favouriteIconDiv = document.createElement('div');
            favouriteIconDiv.classList.add('favourite-icon');

            // Almacenar el ID del artículo actual
            var currentItemId = item;

            // Agregar evento de clic al elemento del corazón
            favouriteIconDiv.addEventListener('click', function() {
                // Llamar a la función unFavItem con el ID del artículo actual
                unFavItem(currentItemId);
                heartIconSvg.style.filter = 'none';
                heartIconSvg.style.opacity = '0.8';
            });

            var heartIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            heartIconSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            heartIconSvg.setAttribute("width", "30");
            heartIconSvg.setAttribute("height", "30");
            heartIconSvg.setAttribute("fill", "rgb(227, 0, 0)");
            heartIconSvg.setAttribute("class", "bi bi-heart-fill");
            heartIconSvg.setAttribute("viewBox", "0 0 16 16");
            heartIconSvg.setAttribute("style", "filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4));");


            var heartPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            heartPath.setAttribute("fill-rule", "evenodd");
            heartPath.setAttribute("d", "M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314");

            heartIconSvg.appendChild(heartPath);
            favouriteIconDiv.appendChild(heartIconSvg);

            itemDiv.appendChild(itemDetailsDiv);
            itemDiv.appendChild(itemPhotoDiv);
            itemDiv.appendChild(favouriteIconDiv);

            favList.appendChild(itemDiv);
        });
    }  
}

/* FUNCION QUE ELIMINA LOS ITEMS DE FAVORITOS DEL CLIENTE */
function unFavItem(item) {
    console.log(item);
    const itemIdToRemove = item.id;
    console.log(fav_items_list[0].items)
    console.log(item)
    const itemIndex = fav_items_list[0].items.findIndex(items => items === itemIdToRemove);
        if (itemIndex !== -1) {
            fav_items_list[0].items.splice(itemIndex, 1);
            
            //Eliminarlo del json
            socket.emit("delete_product", cookiename, item.id, "favoritos")
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

function buscarObjeto(transcript) {
    var objetosBuscar = [];

    if (fav_items_list.length == 0){
        console.log("Lista favoritos está vacía")
    }
    else {
        fav_items_list[0].items.forEach(i => {
        var articulo = productos.find(element => element.id === i);
        objetosBuscar.push(articulo);
    });
    console.log(transcript);
    console.log(objetosBuscar);
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
        })
        .catch(function(error) {
            // Manejar errores
            alert('No se puede acceder al micrófono. Asegúrate de permitir el acceso.');
        });
});