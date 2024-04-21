var socket = io.connect('http://localhost:5500');

var client = null

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


socket.on("alert", function(res) {
    client = res;
    showPopup();
})

function showPopup() {
    var alert = document.getElementById("alert");
    alert.innerHTML = '';

    const titulo = document.createElement('h5');
    titulo.textContent = 'AVISO';

    const parrafo = document.createElement('p');
    parrafo.textContent =  client + ' ha solicitado su ayuda.';

    const botonCancelar = document.createElement('button');
    botonCancelar.id = 'cancel-button';
    botonCancelar.textContent = 'VOY';

    // Agregar los elementos como hijos del div principal
    alert.appendChild(titulo);
    alert.appendChild(parrafo);
    alert.appendChild(botonCancelar);


    document.getElementById("grey-window").style.visibility = "visible";
    document.getElementById("alert").style.visibility = "visible";
    document.getElementById("cancel-button").addEventListener('click', closePopup);
}

function closePopup() {
    document.getElementById("grey-window").style.visibility = "hidden";
    document.getElementById("alert").style.visibility = "hidden";

    var dependiente = getCookie("username");

    socket.emit("alertFinish", dependiente);
}


