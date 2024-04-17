var socket = io.connect('http://localhost:5500');
  socket.on('connect', function(data) {
      socket.emit('join', 'Hello World from client escaner');
  });

var video = document.getElementById('video-feed');

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


// Función para iniciar el escaneo automáticamente
function startScanning() {
    // If found your qr code
    function onScanSuccess(decodeText, decodeResult) {
        console.log(decodeText)
        sendSocket(decodeText);
    }

    let htmlscanner = new Html5QrcodeScanner(
        "video-feed",
        { fps: 10, qrbox: 250 }
    );
    htmlscanner.render(onScanSuccess);
}

function sendSocket(id) {
    var name = getCookie("username");
    console.log(name, "name")
    socket.emit('new_product', parseInt(id), name);

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

