/* ========== CONECTAR CON EL SERVIDOR ========== */

var socket = io.connect('http://localhost:5500');
  socket.on('connect', function(data) {
      socket.emit('join', 'Hello World from client escaner');
  });

var video = document.getElementById('video-feed');

const productos = []

/* ========== FUNCION PARA RECUPERAR LOS PRODUCTOS ========== */

socket.emit("productos");

socket.on('productos', function(pdct) {
    pdct.forEach(elemento => {
        productos.push(elemento);
    });
    ///startScanning()
});

function startScanning() {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
        var video = document.createElement('video');
        video.srcObject = stream;
        video.setAttribute('playsinline', true); // iOS support
        video.play();
        document.getElementById('camara').appendChild(video);

        var canvasElement = document.createElement('canvas');
        var canvas = canvasElement.getContext('2d');

        video.addEventListener('loadedmetadata', function() {
            canvasElement.width = video.videoWidth;
            canvasElement.height = video.videoHeight;
        });

        video.addEventListener('canplay', function() {
            setInterval(function() {
                canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
                var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
                var code = jsQR(imageData.data, imageData.width, imageData.height);
                if (code) {
                    console.log('QR Code encontrado:', code.data);
                    // Aquí puedes hacer lo que desees con el código QR, por ejemplo, mostrarlo en la página
                    showItem(parseInt(code.data));
                }
            }, 1000); // Escanea cada segundo
        });
    })
    .catch(function(err) {
        console.log("No se pudo acceder a la cámara: ", err);
    });
}

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

function showItem(id) {

    var item = productos.find(element => element.id === id);

    document.getElementById("grey-window").style.visibility = "visible";

    var container = document.getElementById("item-container");
    container.style.visibility = "visible";
    container.innerHTML = '';

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
    itemDetailsDiv.appendChild(messageDiv); 
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

    itemDiv.appendChild(itemDetailsDiv);
    itemDiv.appendChild(itemPhotoDiv);

    var buttonDiv = document.getElementById("button-container");

    var cesta = document.createElement('button');
    cesta.textContent = 'Carrito';
    cesta.id = 'cesta';

    var fav = document.createElement('button');
    fav.textContent = 'Favoritos';
    fav.id = 'fav'

    buttonDiv.appendChild(cesta);
    buttonDiv.appendChild(fav);

    container.appendChild(itemDiv);
    cesta.addEventListener('click', () => sendSocket(id, "carritos"));
    fav.addEventListener('click', () => sendSocket(id, "favoritos"));

    var botoncierre = document.createElement('span');
    botoncierre.textContent = "X"
    botoncierre.id = 'botoncierre';

    botoncierre.addEventListener("click", function() {
        container.style.visibility = "hidden"; 
        document.getElementById("grey-window").style.visibility = "hidden";
    });
}

function sendSocket(id, file) {
    document.getElementById("item-container").style.visibility = "hidden";
    document.getElementById("grey-window").style.visibility = "hidden";
    var name = getCookie("username");
    console.log(name, "name");
    socket.emit('new_product', parseInt(id), name, file);

    // Manejar la respuesta del servidor
    socket.on('new_product', function(res) {
        console.log(res);
        if (res === 0) {
            console.log("Producto añadido");
        }
    });
}



document.addEventListener('DOMContentLoaded', function() {
    // Aquí va el código que quieres ejecutar cuando se carga la página
    startScanning();
});