// Seleccionar el video y el contenedor
const video = document.getElementById('video-feed');
const escanerDiv = document.getElementById('escaner');

// Verificar si el navegador soporta getUserMedia
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Obtener permiso para acceder a la cámara
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            // Mostrar la corriente de video en el elemento de video
            video.srcObject = stream;
            // Actualizar el tamaño del contenedor del video para que coincida con el tamaño del video
            video.addEventListener('loadedmetadata', function() {
                escanerDiv.style.width = video.videoWidth + 'px';
                escanerDiv.style.height = video.videoHeight + 'px';
            });
        })
        .catch(function(error) {
            console.error('Error al acceder a la cámara: ', error);
        });
} else {
    console.error('getUserMedia no está soportado en este navegador.');
}
