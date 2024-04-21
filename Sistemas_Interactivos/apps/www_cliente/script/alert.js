/* JAVASCRIPT PARA LA NAVEGACIÓN POR LA APP CLIENTE */
/* ================================================ */

var socket = io.connect('http://localhost:5500');


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

// FUNCION PARA VER EL POPUP
function showPopup() {
    navigator.vibrate(1000);
    var alert = document.getElementById("alert");
    alert.innerHTML = '';

    const titulo = document.createElement('h5');
    titulo.textContent = 'AVISO';

    const parrafo = document.createElement('p');
    parrafo.textContent =  'Al agitar el telefono ha solicitado asistencia.';

    const parrafo2 = document.createElement('p');
    parrafo2.textContent =  'En unos momentos se acercará alguien para ayudarle';

    const botonCancelar = document.createElement('button');
    botonCancelar.id = 'cancel-button';
    botonCancelar.textContent = 'Cancelar';

    // Agregar los elementos como hijos del div principal
    alert.appendChild(titulo);
    alert.appendChild(parrafo);
    alert.appendChild(parrafo2);
    alert.appendChild(botonCancelar);
    document.getElementById("grey-window").style.visibility = "visible";
    document.getElementById("alert").style.visibility = "visible";
    document.getElementById("cancel-button").addEventListener('click', closePopup);


    var cookiename = getCookie("username");

    socket.emit("alert", cookiename);

    socket.on("alertFinish", function(res) {
      var alert = document.getElementById("alert");
      alert.innerHTML = '';
      const titulo = document.createElement('h5');
      titulo.textContent = 'MENSAJE DE LA TIENDA';

      const parrafo = document.createElement('p');
      parrafo.textContent =  res + ' se acercara a usted en el menor tiempo posible.';

      const botonCancelar = document.createElement('button');
      botonCancelar.id = 'cancel-button';
      botonCancelar.textContent = 'Entendido';

      // Agregar los elementos como hijos del div principal
      alert.appendChild(titulo);
      alert.appendChild(parrafo);
      alert.appendChild(botonCancelar);
      document.getElementById("cancel-button").addEventListener('click', closePopup);

    });
}

// FUNCION PARA CERRAR EL POPUP
function closePopup() {
    document.getElementById("grey-window").style.visibility = "hidden";
    document.getElementById("alert").style.visibility = "hidden";

}

// FUNCION PARA SOLICITAR AYUDA AGITANDO EL DISPOSITIVO DE LADO A LADO
window.addEventListener("devicemotion", function(event) {
    var acceleration = event.accelerationIncludingGravity;
    var threshold = 15; // Puedes ajustar este valor según lo que consideres "agitar" el teléfono

    // Calculamos la aceleración total
    var totalAcceleration = Math.sqrt(
      Math.pow(acceleration.x, 2) +
      Math.pow(acceleration.y, 2) +
      Math.pow(acceleration.z, 2)
    );

    // Si la aceleración total supera el umbral, mostramos el div
    if (totalAcceleration > threshold) {
      showPopup();
    }
});

