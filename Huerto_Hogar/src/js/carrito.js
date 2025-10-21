// Precios de productos
const productos = {
    fruit1: { nombre: "Manzanas Fuji", precio: 1200, descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres. Estas manzanas son conocidas por su textura firme y su sabor equilibrado entre dulce y ácido." },
    fruit2: { nombre: "Naranjas Valencianas", precio: 1000, descripcion: "Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad." },
    fruit3: { nombre: "Plátanos Cavendish", precio: 800, descripcion: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Estos plátanos son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada." },
    verdura1: { nombre: "Zanahorias orgánicas", precio: 900, descripcion: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable." },
    verdura2: { nombre: "Espinacas frescas", precio: 700, descripcion: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Estas espinacas son cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional." },
    verdura3: { nombre: "Pimientos tricolores", precio: 1500, descripcion: "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, estos pimientos añaden un toque vibrante y saludable a cualquier receta." },
    organicproduct1: { nombre: "Miel organica", precio: 5000, descripcion: "Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas." }
};

// Obtener carrito desde localStorage
function getCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Guardar carrito
function saveCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Añadir producto al carrito
function addToCarrito(id, cantidad) {
    let carrito = getCarrito();
    const producto = productos[id];
    if (!producto) return;

    const index = carrito.findIndex(item => item.id === id);
    if (index >= 0) {
        carrito[index].cantidad += cantidad;
    } else {
        carrito.push({ id, nombre: producto.nombre, cantidad, precio: producto.precio });
    }

    saveCarrito(carrito);
    renderCarrito();
    renderCarritoPage();
}

function validarCantidadYAgregar(id) {
    let cantidad = parseInt(document.getElementById("cantidad").value);

    if (isNaN(cantidad) || cantidad < 1) {
        alert("La cantidad debe ser al menos 1 😅");
        return;
    }

    addToCarrito(id, cantidad);
}

// Cambiar cantidad (+ o -)
function changeCantidad(id, delta) {
    let carrito = getCarrito();
    const index = carrito.findIndex(item => item.id === id);
    if (index >= 0) {
        carrito[index].cantidad += delta;
        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1);
        }
    }
    saveCarrito(carrito);
    renderCarrito();
    renderCarritoPage();
}

// Eliminar un producto
function removeFromCarrito(id) {
    let carrito = getCarrito().filter(item => item.id !== id);
    saveCarrito(carrito);
    renderCarrito();
    renderCarritoPage();
}

// Renderizar carrito en modal
function renderCarrito() {
    const carrito = getCarrito();
    const lista = document.getElementById("carrito-lista");
    const totalEl = document.getElementById("carrito-total");

    if (!lista || !totalEl) return; // Si no existe modal, no hace nada

    lista.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = `<li class="list-group-item text-center">Tu carrito está vacío</li>`;
        totalEl.textContent = "$0";
        return;
    }

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        lista.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>${item.nombre}</strong><br>
                    <small>$${item.precio} c/u</small>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary me-1 btn-aumentar" data-id="${item.id}">+</button>
                    <span class="mx-1">${item.cantidad}</span>
                    <button class="btn btn-sm btn-outline-secondary ms-1 btn-disminuir" data-id="${item.id}">-</button>
                    <button class="btn btn-sm btn-danger ms-2 btn-eliminar" data-id="${item.id}">x</button>
                </div>
            </li>
        `;
    });

    totalEl.textContent = `$${total}`;

    // Agregar listeners
    lista.querySelectorAll(".btn-aumentar").forEach(btn => {
        btn.addEventListener("click", () => changeCantidad(btn.dataset.id, 1));
    });
    lista.querySelectorAll(".btn-disminuir").forEach(btn => {
        btn.addEventListener("click", () => changeCantidad(btn.dataset.id, -1));
    });
    lista.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", () => removeFromCarrito(btn.dataset.id));
    });
}

// Renderizar carrito dedicado en carrito.html
function renderCarritoPage() {
    const contenedor = document.getElementById("carrito-productos");
    const totalEl = document.getElementById("carrito-total");
    if (!contenedor || !totalEl) return;

    const carrito = getCarrito();
    contenedor.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const descripcion = productos[item.id]?.descripcion || "Descripción breve del producto";

        contenedor.innerHTML += `
          <div class="d-flex border-bottom py-3 align-items-center">
            <img src="img/${item.id}.jpg" alt="${item.nombre}" style="width:80px; height:80px; object-fit:cover;" class="me-3 rounded">
            <div class="flex-grow-1">
              <h5>${item.nombre}</h5>
              <p class="text-muted">${descripcion}</p>
              <div class="d-flex justify-content-between align-items-center">
                <strong>$${subtotal}</strong>
                <div>
                  <button class="btn btn-sm btn-outline-secondary btn-aumentar-page" data-id="${item.id}">+</button>
                  <span class="mx-2">${item.cantidad}</span>
                  <button class="btn btn-sm btn-outline-secondary btn-disminuir-page" data-id="${item.id}">-</button>
                  <button class="btn btn-sm btn-danger btn-eliminar-page" data-id="${item.id}">x</button>
                </div>
              </div>
            </div>
          </div>
        `;
    });

    totalEl.textContent = `$${total}`;

    // Listeners para carrito dedicado
    contenedor.querySelectorAll(".btn-aumentar-page").forEach(btn => {
        btn.addEventListener("click", () => changeCantidad(btn.dataset.id, 1));
    });
    contenedor.querySelectorAll(".btn-disminuir-page").forEach(btn => {
        btn.addEventListener("click", () => changeCantidad(btn.dataset.id, -1));
    });
    contenedor.querySelectorAll(".btn-eliminar-page").forEach(btn => {
        btn.addEventListener("click", () => removeFromCarrito(btn.dataset.id));
    });
}

// Inicializa render
document.addEventListener("DOMContentLoaded", () => {
    renderCarrito();
    renderCarritoPage();

    const btnComprar = document.getElementById("btn-comprar");
    if (btnComprar) {
        btnComprar.addEventListener("click", () => {
            alert("Esto es un mockup, en una página real irías a un sitio de pagos seguros.");
        });
    }
});
