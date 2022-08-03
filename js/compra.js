let compra = new Carrito();
let listaCompra = document.querySelector("#lista-compra tbody");
let carrito = document.getElementById("carrito");
let procesarComprabtn = document.getElementById("procesar-compra");

cargarEventos();
function cargarEventos() {
    document.addEventListener("DOMContentLoaded", compra.leerLocalStorageCompra());

    carrito.addEventListener("click", (e) => {
        compra.eliminarProducto(e);
    });

    compra.calcularTotal();

    procesarComprabtn.addEventListener("click", procesarCompra);
}

function procesarCompra(e) {
    e.preventDefault();

    if (compra.obtenerProductosLocalStorage().length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay productos, selecciona alguno',
            timer: 2000,
            showConfirmButton: false
        }).then(function() {
            window.location = "index.html";
        });
    } else {
        location.href = "checkout.html";
    }
}