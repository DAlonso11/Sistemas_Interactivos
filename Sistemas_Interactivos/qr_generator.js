const fs = require('fs');
const QRCode = require('qrcode');

// Leer el archivo JSON
const jsonData = require('./productos.json');

// Extraer los IDs del JSON
const ids = jsonData.map(item => item.id.toString());

// Directorio donde guardar los archivos PNG
const directorio = './QRs/';

// Función para borrar todos los archivos PNG del directorio
function borrarArchivos() {
    fs.readdirSync(directorio).forEach(file => {
        if (file.endsWith('.png')) {
            fs.unlinkSync(`${directorio}${file}`);
        }
    });
    console.log('Archivos PNG eliminados del directorio.');
}

// Asegurarse de que el directorio exista, si no, crearlo
if (!fs.existsSync(directorio)) {
    fs.mkdirSync(directorio);
} else {
    // Si el directorio ya existe, borrar todos los archivos PNG antes de generar los nuevos códigos QR
    borrarArchivos();
}

// Función para generar y guardar el código QR para cada ID
ids.forEach(async (id, index) => {
    try {
        // Generar el código QR
        const qrCodeData = await QRCode.toDataURL(id);
        const base64Data = qrCodeData.replace(/^data:image\/png;base64,/, '');

        // Guardar el código QR en un archivo PNG
        fs.writeFileSync(`${directorio}qr_code_${id}.png`, base64Data, 'base64');

        console.log(`Código QR para ${id} generado y guardado.`);
    } catch (error) {
        console.error(`Error al generar el código QR para ${id}:`, error);
    }
});