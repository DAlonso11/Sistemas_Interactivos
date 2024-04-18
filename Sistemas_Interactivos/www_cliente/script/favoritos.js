/* ========== CONECTAR CON EL SERVIDOR ========== */

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

socket.on('mi_carrito', function(c) {
    c.forEach(elemento => {
        fav_items_list.push(elemento);
    });
});


/* ========== UPDATE FAVORITOS ========== */

// SE ELIMINA UN FAVORITO


/* ========== FUNCIONAMIENTO ========== */

/* FUNCION QUE AÑADE ITEMS FAVORITOS DEL CLIENTE EN DIVS */
function renderItems(items) {
    var favList = document.getElementById('fav-list');
    
    // Limpiar el contenedor antes de renderizar los elementos nuevamente
    favList.innerHTML = '';

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
        itemPhotoImg.alt = "Logo AppsKES";

        itemPhotoDiv.appendChild(itemPhotoImg);

        var favouriteIconDiv = document.createElement('div');
        favouriteIconDiv.classList.add('favourite-icon');
        
        // Almacenar el ID del artículo actual
        var currentItemId = item.id;

        // Agregar evento de clic al elemento del corazón
        favouriteIconDiv.addEventListener('click', function() {
            // Llamar a la función unFavItem con el ID del artículo actual
            unFavItem(currentItemId);
        });

        var heartIconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        heartIconSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        heartIconSvg.setAttribute("width", "30");
        heartIconSvg.setAttribute("height", "30");
        heartIconSvg.setAttribute("fill", "rgb(227, 0, 0)");
        heartIconSvg.setAttribute("class", "bi bi-heart-fill");
        heartIconSvg.setAttribute("viewBox", "0 0 16 16");

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

/* FUNCION QUE ELIMINA LOS ITEMS DE FAVORITOS DEL CLIENTE */
function unFavItem(itemId) {
    // Filtrar la lista de elementos favoritos para eliminar el elemento con el ID dado
    fav_items_list = fav_items_list.filter(function(item) {
        return item.id !== itemId;
    });
    console.log(fav_items_list);
    //Eliminarlo del json
    socket.emit("delete_product", cookiename, item.id, "favoritos")
    socket.on('delete_product', function(res) {
        console.log(res);
        if (res === 0) {
            console.log("Success");
        }
    });
    // Volver a renderizar la lista de elementos favoritos (+ update)
    renderItems(fav_items_list);
}


/* ========== ONLOAD ========== */
fillFavItemsList();
renderItems(fav_items_list);


