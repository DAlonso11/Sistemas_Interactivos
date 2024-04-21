/* ========== CONECTAR CON EL SERVIDOR ========== */

var socket = io.connect('http://localhost:5500');
  socket.on('connect', function(data) {
      socket.emit('join', 'Hello World from tienda escaner');
});

const productos = []

socket.emit("productos");

socket.on('productos', function(pdct) {
    pdct.forEach(elemento => {
        productos.push(elemento);
    });
    startScanning();
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
                  showPrice(code.data);
              }
          }, 1000); // Escanea cada segundo
      });
  })
  .catch(function(err) {
      console.log("No se pudo acceder a la cámara: ", err);
  });
}

function showPrice(code) {
  let pedidos = [];
  socket.emit("pedidos");

  socket.on('pedidos', function(pdds) {
    pdds.forEach(elemento => {
        pedidos.push(elemento);
    });

    console.log(pedidos);

    let mi_pedido = pedidos.find(element => element.pedido === code);

    let precio = 0.00;

    console.log(mi_pedido);
    
    mi_pedido.items.forEach(item => {
      var producto = productos.find(element => element.id === item);
      console.log(producto);
      precio += parseFloat(producto.price);
    });

    document.getElementById("camara").style.display = "none";

    var precioDiv = document.getElementById("precio");

    precioDiv.innerHTML = "Precio de la compra: " + precio + " €";

    document.getElementById("mensaje-pago").style.display = "none";

    document.getElementById("mensaje-pagado").style.display = "block";

    pedidoPagado(code);

  });
}


function pedidoPagado(codigo) {
  socket.emit("estadoPedido", codigo, "Pagado");
  socket.on("estadoPedido", function(res) {
    if (res === 0) {
      console.log("Estado cambiado correctamente");
    }
  })
}