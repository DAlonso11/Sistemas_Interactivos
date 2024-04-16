var video = document.getElementById('video-feed');
const canvasElement = document.getElementById('canvas');
const canvas = canvasElement.getContext('2d', { willReadFrequently: true });

// COSAS DE LA CAMARA
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

// Función para escanear el código QR
function scanQRCode() {
    canvasElement.width = video.videoWidth;
    canvasElement.height = video.videoHeight;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
        console.log('ID del código QR:', code.data);
        product_id = code.data;
    }
    requestAnimationFrame(scanQRCode); // Llama a esta función recursivamente para mantener el escaneo activo
}

video.onloadedmetadata = function() {
    console.log('Ancho del video:', video.videoWidth);
    console.log('Alto del video:', video.videoHeight);
    scanQRCode(); // Llamar a scanQRCode una vez que se haya cargado la metadata del video
};
<script src="https://cdn.jsdelivr.net/npm/jsqr@1.0.0/dist/jsQR.js"></script>
