/* JAVASCRIPT PARA LA NAVEGACIÓN POR LA APP PERSONAL TIENDA */
/* ======================================================== */

/* PERFIL */
function perfil() {
    window.location.href = "perfil.html";
};

/* PEDIDOS */
function pedidos() {
    window.location.href = "pedidos.html";
};

/* ESCANER */
function escaner() {
    window.location.href = "escaner.html";
};

/* ESTADISTICAS */
function estadisticas() {
    window.location.href = "estadisticas.html";
};

/* INFO */
function info() {
    window.location.href = "info.html";
};



/* EVENTOS DEL ESQUELETO */
document.getElementById("header-icon").addEventListener('click', perfil);
document.getElementById("title").addEventListener('click', info);
document.getElementById("info-icon").addEventListener('click', info);
document.getElementById("qr-icon").addEventListener('click', escaner);
document.getElementById("box-icon").addEventListener('click', pedidos);
document.getElementById("statistics-icon").addEventListener('click', estadisticas);