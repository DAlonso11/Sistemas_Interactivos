/* JAVASCRIPT PARA LA NAVEGACIÓN POR LA APP CLIENTE */
/* ================================================ */

// FUNCION PARA VER EL POPUP
function showPopup() {
    navigator.vibrate(1000);
    document.getElementById("grey-window").style.visibility = "visible";
    document.getElementById("alert").style.visibility = "visible";
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

// CLICK PARA CERRAR EL POPUP
document.getElementById("cancel-button").addEventListener('click', closePopup);
