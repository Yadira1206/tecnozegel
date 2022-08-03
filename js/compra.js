let compra = new Carrito();
let listaCompra = document.querySelector("#lista-compra tbody");
let carrito = document.getElementById("carrito");

cargarEventos();
function cargarEventos() {
    document.addEventListener("DOMContentLoaded", compra.leerLocalStorageCompra());

    carrito.addEventListener("click", (e) => {
        compra.eliminarProducto(e);
    });

    compra.calcularTotal();
}