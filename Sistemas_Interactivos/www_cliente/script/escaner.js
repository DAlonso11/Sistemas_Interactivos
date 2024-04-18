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
});

// Función para acceder a la cámara
function activateCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(function(stream) {
                video.srcObject = stream;
            })
            .catch(function(error) {
                console.error('Error al acceder a la cámara:', error);
            });
    } else {
        console.error('getUserMedia no está soportado en este navegador');
    }
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

    //document.getElementById("grey-window").style.visibility = "visible";

    /*HELP DIEGO*/
    //var container = document.getElementById("item-container");
    //container.innerHTML = '';

    /*
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
    itemPhotoImg.src = "../style/images/" + item.name + ".png";
    itemPhotoImg.alt = item.name;

    itemPhotoDiv.appendChild(itemPhotoImg);

    itemDiv.appendChild(itemDetailsDiv);
    itemDiv.appendChild(itemPhotoDiv);

    List.appendChild(itemDiv);*/
    document.getElementById('cesta').addEventListener('click', () => sendSocket(id, "carritos"));
    document.getElementById('fav').addEventListener('click', () => sendSocket(id, "favoritos"));
}

// Función para iniciar el escaneo automáticamente
function startScanning() {
    // If found your qr code
    function onScanSuccess(decodeText, decodeResult) {
        console.log(decodeText);
        showItem(decodeText);
        //sendSocket(decodeText);
    }

    let htmlscanner = new Html5QrcodeScanner(
        "video-feed",
        { fps: 10, qrbox: 250 }
    );
    htmlscanner.render(onScanSuccess);
}

function sendSocket(id, file) {
    var name = getCookie("username");
    console.log(name, "name");
    socket.emit('new_product', parseInt(id), name, file);

    // Manejar la respuesta del servidor
    socket.on('new_product', function(res) {
        console.log(res);
        if (res === 0) {
            console.log("Success");
        }
    });
}

// Activar la cámara inicialmente
activateCamera();

// Iniciar el escaneo automáticamente cuando la página esté completamente cargada
document.addEventListener("DOMContentLoaded", function() {
    startScanning();
});



/*document.addEventListener("DOMContentLoaded", function() {
    const videoFeed = document.getElementById('video-feed');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function(stream) {
            videoFeed.srcObject = stream;
            videoFeed.play();
        })
        .catch(function(err) {
            console.error("Error al acceder a la cámara:", err);
        });

    function scanQRCode() {
        ctx.drawImage(videoFeed, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code && code.score > 0.8) { // Verificar si se detecta un código QR y su puntuación es alta
            alert("Código QR detectado: " + code.data);
        }
        requestAnimationFrame(scanQRCode);
    }

    scanQRCode();
});*/




// enviamos el id correspondiente al servidor para que añada ese producto a carrito

