let carrito = [];


function renderCarrito() {
    const tbody = document.getElementById("carrito-items");
    tbody.innerHTML = ""; 

    let totalGeneral = 0;
    carrito.forEach((producto, index) => {
        const total = producto.precio * producto.cantidad;
        totalGeneral += total;

        tbody.innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>$${producto.precio.toFixed(2)}</td>
                <td>${producto.cantidad}</td>
                <td>$${total.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("total-general").textContent = `Total: $${totalGeneral.toFixed(2)}`;
}


function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    renderCarrito();
    guardarCarritoEnStorage(); 
}


function eliminarProducto(index) {
    carrito.splice(index, 1);
    renderCarrito();
    guardarCarritoEnStorage(); 
}


document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = [];
    renderCarrito();
    guardarCarritoEnStorage(); 
});


function guardarCarritoEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        renderCarrito();
    }
}

document.querySelectorAll('.comprar-ahora').forEach(boton => {
    boton.addEventListener('click', () => {
        const nombre = boton.getAttribute('data-nombre');
        const precio = parseFloat(boton.getAttribute('data-precio'));
        agregarAlCarrito(nombre, precio);
    });
});


document.addEventListener('DOMContentLoaded', cargarCarritoDeStorage);

