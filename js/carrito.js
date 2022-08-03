class Carrito {
    comprarProducto(e) {
        e.preventDefault();

        if (e.target.classList.contains("agregar-carrito")) {
            let producto = e.target.parentElement.parentElement.parentElement;
            this.leerDatosProductos(producto);
        }
    }

    leerDatosProductos(producto) {
        let infoProducto = {
            imagen : producto.querySelector("img").src,
            marca : producto.querySelector(".cat span").textContent,
            titulo : producto.querySelector("h3").textContent,
            precio : producto.querySelector(".price-sale").textContent,
            id : producto.querySelector(".agregar-carrito").getAttribute("data-id"),
            cantidad : 1
        }

        let productosLS;

        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS) {
            if (productoLS.id == infoProducto.id) {
                productosLS = productoLS.id;
            }
        });

        if (productosLS === infoProducto.id) {
            // console.log("Producto ya agregado!!");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El producto ya está agregado!',
                timer: 2000,
                showConfirmButton: false
            });
        } else {
            this.insertarCarrito(infoProducto);
            this.calcularTotal();
        }
    }

    insertarCarrito(producto) {
        // console.log(producto.imagen);
        // console.log(producto.marca);
        // console.log(producto.titulo);
        // console.log(producto.precio);
        // console.log(producto.id);

        this.guardarProductosLocalStorage(producto);
    }

    eliminarProducto(e) {
        e.preventDefault();

        let producto,
            productoID;

        if (e.target.classList.contains("borrar-producto")) {
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector(".borrar-producto").getAttribute("data-id");
        }

        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();
    }

    guardarProductosLocalStorage(producto) {
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem("productos", JSON.stringify(productos));
    }

    obtenerProductosLocalStorage() {
        let productoLS;

        if (localStorage.getItem("productos") === null) {
            productoLS = [];
        } else {
            productoLS = JSON.parse(localStorage.getItem("productos"));
        }

        return productoLS;
    }

    eliminarProductoLocalStorage(productoID) {
        let productosLS;

        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS, index) {
            if (productoLS.id === productoID) {
                productosLS.splice(index, 1);
            }
        });

        localStorage.setItem("productos", JSON.stringify(productosLS));
    }

    leerLocalStorage() {
        let productosLS;

        productosLS = this.obtenerProductosLocalStorage();
    }

    leerLocalStorageCompra() {
        let productosLS;

        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="product-remove">
                    <a href="#" class="btn_close_product borrar-producto" data-id="${producto.id}">
                        <span class="ion-ios-close"></span>
                    </a>
                </td>
    
                <td class="image-prod">
                    <div class="img">
                        <img src="${producto.imagen}" alt="" class="img-product">
                    </div>
                </td>
    
                <td class="product-name">
                    <h3>${producto.marca}</h3>
                    <p>${producto.titulo}</p>
                </td>
    
                <td class="price">${producto.precio}</td>
    
                <td class="quantity">
                    <div class="input-group mb-3">
                        <input type="number" name="quantity" class="quantity form-control input-number" value="${producto.cantidad}" min="1" max="100">
                    </div>
                </td>
    
                <td class="total">${producto.precio * producto.cantidad}</td>
            `;

            listaCompra.appendChild(row);
        });
    }

    vaciarLocalStorage() {
        localStorage.clear();
    }

    procesarPedido(e) {
        e.preventDefault();

        location.href = "cart.html";
    }

    calcularTotal() {
        let productoLS;
        let total = 0,
            subtotal = 0,
            igv = 0;
        
        productoLS = this.obtenerProductosLocalStorage();

        for (let i = 0; i < productoLS.length; i++) {
            let element = Number(productoLS[i].precio * productoLS[i].cantidad);
            total = total + element;
        }

        igv = parseFloat(total * 0.18).toFixed(2);
        subtotal = parseFloat(total - igv).toFixed(2);

        $(".subtotal_cr").html("S/. " + subtotal);
        $(".igv_cr").html("S/. " + igv);
        $(".total_cr").html("S/. " + total.toFixed(2));

        $(".js__showCantProductCart").html(productoLS.length);
    }
}