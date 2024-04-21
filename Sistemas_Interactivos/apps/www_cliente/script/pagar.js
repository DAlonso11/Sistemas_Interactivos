/* ========== CONECTAR CON EL SERVIDOR ========== */

var socket = io.connect('http://localhost:5500');
  socket.on('connect', function(data) {
      socket.emit('join', 'Hello World from client info');
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

/* ========== GET PRODUCTOS & CARRITO ========== */

var carrito = []
const productos = []
var cookiename = getCookie("username");
let codigo = null;
socket.emit('numPedido');

socket.on('numPedido', function(p) {
      codigo = p

      socket.emit('filterJSON', cookiename, "carritos");

      socket.on('filterJSON', function(c) {
          c.forEach(elemento => {
              carrito.push(elemento);
          });
          crearPedido();
      });
});


/* ========== FUNCIONES PARA PROCESAR EL PEDIDO ========== */

function crearPedido() {
  if (carrito.length === 0) {
    socket.emit('ultimoPedido', cookiename);
    socket.on('ultimoPedido', function(u) {
      if (u.estado === "Pendiente de Pago") {
        showQR(u.pedido);
      }
    });

  } else if (carrito.length !== 0) {
    var pedido = generadorPedido();
    var fechaActual = new Date();
    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1;
    var año = fechaActual.getFullYear();

    var fecha = dia + '/' + mes + '/' + año;
    var items = []
    carrito[0].items.forEach(elemento => {
      items.push(elemento);
    });
    var pedidoDict = {
      cliente: cookiename, 
      pedido: pedido,
      estado: "Pendiente de Pago", 
      llegada: "-", 
      fecha: fecha, 
      items: items
    };
    socket.emit("crearPedido", pedidoDict);
    socket.on('crearPedido', function(res) {
      if (res === 0) {
        console.log("Pedido creado");
      }
    });
    socket.emit("deleteCarrito", cookiename)
    socket.on("deleteCarrito", function(res) {
      if (res === 0){
        generarQR(pedido);
        console.log("Pedido borrado");
      }
    });
  };
};

function generadorPedido() { 
  let num = parseInt(codigo.substring(0, 6));
  let letra = codigo.charAt(6);

  if (num === 999999 && letra === 'Z') {
    return "Ya has alcanzado la última matrícula posible.";
  }

  if (num < 999999) {
    num++;
  } else {
    num = 0;
    // Si la letra es Z, volvemos a A y aumentamos la penúltima letra
    if (letra === 'Z') {
      letra = 'A';
      return num.toString().padStart(6, "0") + letra;
    }
    // Incrementar letra
    letra = String.fromCharCode(letra.charCodeAt(0) + 1);
  }
  return num.toString().padStart(6, "0") + letra;
}

function showQR(name) {

  var QRcontainer = document.getElementById("qr_cliente");
  
  var QR = document.createElement('img');
  QR.id = "QR";
  QR.src = "QR_pedidos/" + name + '.png';

  QRcontainer.appendChild(QR);
}

// generar el qr con el codigo de pedido

function generarQR(name) {
  socket.emit("QRgenerator", name);

  socket.on("QRgenerator", function(res) {
    if (res === 0) {
      console.log("QR generado");
      showQR(name);
    }
    
  });
}
