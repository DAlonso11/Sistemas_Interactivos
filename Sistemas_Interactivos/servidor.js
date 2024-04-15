const http = require('http');
const fs = require('fs');

const PORT = 3000;
console.log("Servidor ON");

const serveStaticFile = async (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, function(err, data) {
      if(err) reject(err);
      resolve(data);
    });
  });
} 

const writeStaticFile = async(file, data) => {
  return new Promise ((resolve, reject)=> {
    fs.writeFile(file, data, (err) => {
      if (err) reject(err);
      resolve("File correctly saved");
    })
  })
}

const sendResponse = (response, content, contentType) => {
  response.writeHead(200, {"Content-Type": contentType});
  response.end(content);
}

const handleRequest = async (request, response) => {
    const url = request.url;
    if(request.method === "GET"){
        let content;
        let contentType;
        switch(url){
            case "/":
            case "/cesta.html":
                content = await serveStaticFile("www:cliente/cesta.html");
                contentType = "text/html";
                break;
            case "/compras.html":
                content = await serveStaticFile("www:cliente/compras.html");
                contentType = "text/html";
                break;
            case "/escaner.html":
                content = await serveStaticFile("www:cliente/escaner.html");
                contentType = "text/html";
                break;
            case "/favoritos.html":
                content = await serveStaticFile("www:cliente/favoritos.html");
                contentType = "text/html";
                break;
            case "/index.html":
                content = await serveStaticFile("www:cliente/info.html");
                contentType = "text/html";
                break;
            case "/pagar.html":
                content = await serveStaticFile("www:cliente/pagar.html");
                contentType = "text/html";
                break;
            case "/registro.html":
                content = await serveStaticFile("www:cliente/registro.html");
                contentType = "text/html";
                break;
            case "/alert.js":
                content = await serveStaticFile("www:cliente/script/alert.js");
                contentType = "text/javascript";
                break;
            case "/cesta.js":
                content = await serveStaticFile("www:cliente/script/cesta.js");
                contentType = "text/javascript";
                break;
            case "/compras.js":
                content = await serveStaticFile("www:cliente/script/compras.js");
                contentType = "text/javascript";
                break;
            case "/escaner.js":
                content = await serveStaticFile("www:cliente/script/escaner.js");
                contentType = "text/javascript";
                break;
            case "/favoritos.js":
                content = await serveStaticFile("www:cliente/script/favoritos.js");
                contentType = "text/javascript";
                break;
            case "/pagar.js":
                content = await serveStaticFile("www:cliente/script/pagar.js");
                contentType = "text/javascript";
                break;
            case "/pages.js":
                content = await serveStaticFile("www:cliente/script/pages.js");
                contentType = "text/javascript";
                break;
            case "/registro.js":
                content = await serveStaticFile("www:cliente/script/registro.js");
                contentType = "text/javascript";
                break;
            case "/script.js":
                content = await serveStaticFile("www:cliente/script/script.js");
                contentType = "text/javascript";
                break;
            case "/cesta.css":
                content = await serveStaticFile("www:cliente/style/cesta.css");
                contentType = "text/css";
                break;
            case "/compras.css":
                content = await serveStaticFile("www:cliente/style/compras.css");
                contentType = "text/css";
                break;
            case "/escaner.css":
                content = await serveStaticFile("www:cliente/style/escaner.css");
                contentType = "text/css";
                break;
            case "/favoritos.css":
                content = await serveStaticFile("www:cliente/style/favoritos.css");
                contentType = "text/css";
                break;
            case "/info.css":
                content = await serveStaticFile("www:cliente/style/info.css");
                contentType = "text/css";
                break;
            case "/pagar.css":
                content = await serveStaticFile("www:cliente/style/pagar.css");
                contentType = "text/css";
                break;
            case "/registro.css":
                content = await serveStaticFile("www:cliente/style/registro.css");
                contentType = "text/css";
                break;
            case "/style.css":
                content = await serveStaticFile("www:cliente/style/style.css");
                contentType = "text/css";
                break;
            case "/carritos/get":
                content = await serveStaticFile("carritos.json");
                contentType = "application/json";
                break;
            case "/favoritos/get":
                content = await serveStaticFile("favoritos.json");
                contentType = "application/json";
                break;
            case "/pedidos/get":
                content = await serveStaticFile("pedidos.json");
                contentType = "application/json";
                break;
            case "/productos/get":
                content = await serveStaticFile("productos.json");
                contentType = "application/json";
                break;
            case "/usuarios/get":
                content = await serveStaticFile("usuarios.json");
                contentType = "application/json";
                break;
            default: 
                content = url + "Ruta no valida\r\n";
                contentType = "text/html";
        }

        sendResponse(response, content, contentType);
    } 
    
    else if (request.method === "POST" && request.url === "/favoritos/update") {        
        let data = "";        
        request.on("data", chunk => {
            data += chunk;
        });
        console.log(data);
        request.on("end", async () => {
            try {
                await writeStaticFile("favoritos.json", data);
                sendResponse(response, "Archivo guardado correctamente", "text/plain");
            } catch (error) {
                console.error("Error al actualizar favoritos.json:", error);
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.end("Error al actualizar favoritos.json");
            }
        });
    }
  
    else if (request.method === "POST" && request.url === "/pedidos/update") {        
        let data = "";        
        request.on("data", chunk => {
            data += chunk;
        });
        console.log(data);
        request.on("end", async () => {
            try {
                await writeStaticFile("pedidos.json", data);
                sendResponse(response, "Archivo guardado correctamente", "text/plain");
            } catch (error) {
                console.error("Error al actualizar pedidos.json:", error);
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.end("Error al actualizar pedidos.json");
            }
        });
    }

    else if (request.method === "POST" && request.url === "/productos/update") {        
        let data = "";        
        request.on("data", chunk => {
            data += chunk;
        });
        console.log(data);
        request.on("end", async () => {
            try {
                await writeStaticFile("productos.json", data);
                sendResponse(response, "Archivo guardado correctamente", "text/plain");
            } catch (error) {
                console.error("Error al actualizar productos.json:", error);
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.end("Error al actualizar productos.json");
            }
        });
    }

    else if (request.method === "POST" && request.url === "/usuarios/update") {        
        let data = "";        
        request.on("data", chunk => {
            data += chunk;
        });
        console.log(data);
        request.on("end", async () => {
            try {
                await writeStaticFile("usuarios.json", data);
                sendResponse(response, "Archivo guardado correctamente", "text/plain");
            } catch (error) {
                console.error("Error al actualizar usuarios.json:", error);
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.end("Error al actualizar usuarios.json");
            }
        });
    }
    
    else {
        response.writeHead(405, {"Content-Type": "text/html"});
        response.write(`Método ${request.method} no permitido!\r\n`);
    }  

}

const server = http.createServer(handleRequest);
server.listen(PORT);
