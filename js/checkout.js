let checkout = new Carrito();
let procesarCheckoutbtn = document.getElementById("procesar-checkout");
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let pais = document.getElementById("pais");
let direccion = document.getElementById("direccion");
let direccionApart = document.getElementById("direccion-apart");
let pueblo = document.getElementById("pueblo");
let postal = document.getElementById("postal");
let telefono = document.getElementById("telefono");
let correo = document.getElementById("correo");

cargarEventos();
function cargarEventos() {
    checkout.calcularTotal();

    procesarCheckoutbtn.addEventListener("click", procesarCheckout);
}

function procesarCheckout(e) {
    e.preventDefault();

    if (nombre.value === '' || apellido.value === '' || pais.value === '' || direccion.value === '' || pueblo.value === '' || postal.value === '' || telefono.value === '' || correo.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingresen todos los campos requeridos',
            timer: 2000,
            showConfirmButton: false
        });
    } else {
        let $loadingAlert = $(".js__anuncioEnviadoPedido");
        let $loadingAlertTxt = $(".js__anuncioEnviadoPedido span");
        $loadingAlert.css({'display': 'block'});

        // let enviado = document.querySelector("")
        setTimeout(function() {
            $loadingAlertTxt.html("Fue enviado correctamente.");
            $loadingAlert.removeClass("loading");
        }, 3000);
    }
}

function selectPais() {
    console.log(pais.options[pais.selectedIndex].value);
}