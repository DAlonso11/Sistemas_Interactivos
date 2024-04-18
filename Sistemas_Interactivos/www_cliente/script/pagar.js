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
var n_p
var cookiename = getCookie("username");


// SACAMOS LOS PRODUCTOS
socket.emit('productos');

socket.on('productos', function(pdct) {
    pdct.forEach(elemento => {
        productos.push(elemento);
    });
});

// SACAMOS LOS EL ULTIMO PEDIDO
socket.emit('numPedido');

socket.on('numPedido', function(p) {
    n_p = p
});

// SACAMOS EL CARRITO DEL USUARIO
socket.emit('filterJSON', cookiename, "carritos");

socket.on('filterJSON', function(c) {
    c.forEach(elemento => {
        carrito.push(elemento);
    });
    crearPedido();
});

/* ========== FUNCIONES PARA PROCESAR EL PEDIDO ========== */

function crearPedido() {
  if (carrito.length === 0) {
    console.log(carrito)
    //no hay nada que pagar, mandar aviso al usuario
    console.log(1)
  } else {
    var pedido = 0;
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
      items: items};

    socket.emit("crearPedido", pedidoDict);
    socket.on('crearPedido', function(res) {
      console.log(res);
      if (res === 0) {
          console.log("Success");
      }
    });

    socket.emit("delete_carrito", cookiename)
    socket.on()
  }
}

function generadorPedido() {
  var num = parseInt(n_p);
  num++;
  var strNuevo = num.toString(); // Faltan muchas comprobaciones pero me da pereza ahora
  if (num === 1000000) {
    strNuevo = "000000"
  }
  var caracter = n_p.match(/[A-Za-z]/)[0]; //no va, arreglar 
  strNuevo += caracter;

  return strNuevo
}


// generar el qr con el codigo de pedido

