let carro = new Carrito();
let productos = $(".lista-productos");
let procesarPedidobtn = $(".procesar-pedido");

cargarEventos();
function cargarEventos() {
    $(productos).on("click", function(e) {
        carro.comprarProducto(e)
    });

    document.addEventListener("DOMContentLoaded", carro.leerLocalStorage());

    $(procesarPedidobtn).on("click", function(e) {
        carro.procesarPedido(e);
    });

    carro.calcularTotal();
}