/* ========== USUARIOS.JSON ========== */

var users = [
    {
        "tipo": "cliente",
        "nombre": "Marta Perez",
        "contraseña": "1111"
    },
    {
        "tipo": "cliente",
        "nombre": "Jorge Ramirez",
        "contraseña": "0000"
    },
    {
        "tipo": "cliente",
        "nombre": "Francisco Garcia",
        "contraseña": "1234"
    },
    {
        "tipo": "personal",
        "nombre": "Javier Lopez",
        "contraseña": "9999"
    }
]

/* FUNCION PARA RECUPERAR LOS USUARIOS DEL JSON */


/* FUNCION PARA ACTUALIZAR EL JSON */


/* ========== FORMS ========== */

/* VISUALIZACION DE REGISTER & LOG-IN */
document.addEventListener("DOMContentLoaded", function() {
    // Obtener los elementos del DOM
    var registerForm = document.getElementById("main-register");
    var loginForm = document.getElementById("main-log-in");

    // Ocultar el formulario de registro al cargar la página
    loginForm.style.display = "grid";
    registerForm.style.display = "none";

    // Función para mostrar el formulario de registro y ocultar el de inicio de sesión
    function showRegisterForm() {
        registerForm.style.display = "grid";
        loginForm.style.display = "none";
    }

    // Función para mostrar el formulario de inicio de sesión y ocultar el de registro
    function showLoginForm() {
        registerForm.style.display = "none";
        loginForm.style.display = "grid";
    }

    // Agregar eventos click a los enlaces de registro e inicio de sesión
    var registerLink = document.querySelector("#registrate-link");
    var loginLink = document.querySelector("#log-in-link");

    registerLink.addEventListener("click", showRegisterForm);
    loginLink.addEventListener("click", showLoginForm);

    // Agregar evento click para el botón de "Iniciar sesión"
    var loginButton = document.querySelector("#boton-log-in");
    loginButton.addEventListener("click", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente
        if (verificarCredenciales()) {
            // Si las credenciales son válidas, crear la cookie con el nombre de usuario
            crearCookie();
            console.log("Cookie creada: ", document.cookie);
            // Redirigir a la página correspondiente según el tipo de usuario
            redireccionarSegunTipoUsuario();
        }
    });

    // Agregar evento click para el botón de "Continuar"
    var continueButton = document.querySelector(".signupbtn");
    continueButton.addEventListener("click", function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente
        var usernameInput = document.querySelector('input[name="email"]');
        var passwordInput = document.querySelector('input[name="psw"]');
        var tipoInput = document.querySelector('select[name="tipo"]');

        var username = usernameInput.value;
        var password = passwordInput.value;
        var tipo = tipoInput.value;

        if (agregarUsuarioNuevo(username, password, tipo)) {
            // Redirigir a la página correspondiente según el tipo de usuario
            redireccionarSegunTipoUsuario();
        }
    });

});

/* FUNCION PARA REDIRIGIR A LA PÁGINA CORRESPONDIENTE SEGÚN EL TIPO DE USUARIO */
function redireccionarSegunTipoUsuario() {
    var username = obtenerCookie("username");

    for (var i = 0; i < users.length; i++) {
        if (users[i].nombre === username) {
            if (users[i].tipo === "cliente") {
                window.location.href = "./info.html";
            } else if (users[i].tipo === "personal") {
                window.location.href = "../www:tienda/info.html";
            }
        }
    }
}

/* FUNCION PARA OBTENER EL VALOR DE UNA COOKIE */
function obtenerCookie(nombre) {
    var nombreCookie = nombre + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(nombreCookie) === 0) {
            return cookie.substring(nombreCookie.length, cookie.length);
        }
    }
    return "";
}

/* ========== LOG IN ========== */

/* FUNCION PARA VERIFICAR LOS DATOS DE LOG IN*/
function verificarCredenciales() {
    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");

    var username = usernameInput.value;
    var password = passwordInput.value;

    var credencialesValidas = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].nombre === username && users[i].contraseña === password) {
            credencialesValidas = true;
            break;
        }
    }

    if (!credencialesValidas) {
        document.getElementById("mensaje-error").textContent = "El nombre de usuario y/o la contraseña son incorrectas.";
        return false; // Evitar que se envíe el formulario
    }

    // Si las credenciales son válidas, permitir el envío del formulario
    return true;
}

/* FUNCION PARA CREAR LA COOKIE QUE ALMACENE EL USUARIO Y MOSTRAR LA APP ACORDE A SUS DATOS */
function crearCookie() {
    var usernameInput = document.getElementById("username");
    var username = usernameInput.value;

    // Crear la cookie con el nombre de usuario
    document.cookie = "username=" + username + "; path=/";
}

/* ========== REGISTER ========== */

/* FUNCIÓN PARA AÑADIR USUARIO NUEVO */
function agregarUsuarioNuevo(nombre, contraseña, tipo) {
    // Verificar si el nombre de usuario ya existe
    if (usuarioExistente(nombre)) {
        console.error("El nombre de usuario ya está en uso.");
        return false; // Evitar agregar un usuario existente
    }

    // Agregar el nuevo usuario a la lista de usuarios
    users.push({
        "tipo": tipo,
        "nombre": nombre,
        "contraseña": contraseña
    });

    console.log("Usuario agregado correctamente.");
    console.log(users); // Para visualizar la lista de usuarios actualizada

    return true; // Usuario agregado correctamente
}

/* FUNCIÓN PARA VERIFICAR SI EL NOMBRE DE USUARIO YA EXISTE */
function usuarioExistente(nombreUsuario) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].nombre === nombreUsuario) {
            console.log("usuario esta");
            return true; // Nombre de usuario encontrado en la lista de usuarios
        }
    }
    console.log("No esta");
    return false; // Nombre de usuario no encontrado en la lista de usuarios
}




