let carro = new Carrito();
let productos = document.getElementById("lista-productos");
let procesarPedidobtn = $(".procesar-pedido");

cargarEventos();
function cargarEventos() {
    productos.addEventListener("click", (e) => {
        carro.comprarProducto(e);
    });

    document.addEventListener("DOMContentLoaded", carro.leerLocalStorage());

    $(procesarPedidobtn).on("click", function(e) {
        carro.procesarPedido(e);
    });
}