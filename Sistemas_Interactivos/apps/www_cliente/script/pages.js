/* JAVASCRIPT PARA LA NAVEGACIÓN POR LA APP CLIENTE */
/* ================================================ */

/* CESTA */
function cesta() {
    window.location.href = "cesta.html";
};

/* COMPRAS */
function compras() {
    window.location.href = "compras.html";
};

/* ESCANER */
function escaner() {
    window.location.href = "escaner.html";
};

/* FAVORITOS */
function favoritos() {
    window.location.href = "favoritos.html";
};

/* INFO */
function info() {
    window.location.href = "info.html";
};



/* EVENTOS DEL ESQUELETO */
document.getElementById("header-icon").addEventListener('click', cesta);
document.getElementById("title").addEventListener('click', info);
document.getElementById("info-icon").addEventListener('click', info);
document.getElementById("qr-icon").addEventListener('click', escaner);
document.getElementById("box-icon").addEventListener('click', compras);
document.getElementById("fav-icon").addEventListener('click', favoritos);


