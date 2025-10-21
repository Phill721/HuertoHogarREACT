// Datos de ejemplo para ventas
let ventas = [
    { 
        id: 'V-001', 
        cliente: 'Juan Pérez', 
        fecha: '15/05/2023', 
        productos: [
            { id: 1, nombre: "Manzanas Fuji", cantidad: 3, precio: 1200 },
            { id: 2, nombre: "Zanahorias Orgánicas", cantidad: 2, precio: 900 }
        ], 
        total: 5400, 
        estado: 'completada' 
    },
    { 
        id: 'V-002', 
        cliente: 'María González', 
        fecha: '14/05/2023', 
        productos: [
            { id: 3, nombre: "Miel Orgánica", cantidad: 1, precio: 3500 },
            { id: 4, nombre: "Queso de Cabra", cantidad: 2, precio: 4500 }
        ], 
        total: 12500, 
        estado: 'completada' 
    },
    { 
        id: 'V-003', 
        cliente: 'Carlos López', 
        fecha: '13/05/2023', 
        productos: [
            { id: 1, nombre: "Manzanas Fuji", cantidad: 5, precio: 1200 },
            { id: 2, nombre: "Zanahorias Orgánicas", cantidad: 3, precio: 900 }
        ], 
        total: 8700, 
        estado: 'pendiente' 
    }
];

// Datos de productos (para la demo, en producción se conectaría con el módulo de productos)
let productos = [
    { id: 1, nombre: "Manzanas Fuji", categoria: "frutas", precio: 1200, stock: 150 },
    { id: 2, nombre: "Zanahorias Orgánicas", categoria: "verduras", precio: 900, stock: 100 },
    { id: 3, nombre: "Miel Orgánica", categoria: "organicos", precio: 3500, stock: 50 },
    { id: 4, nombre: "Queso de Cabra", categoria: "lacteos", precio: 4500, stock: 30 }
];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Filtrado de ventas
    document.getElementById('ordenar-ventas').addEventListener('change', ordenarVentas);
    
    // Configurar modal
    const modal = document.getElementById('modal-detalles');
    const cerrarModal = document.getElementById('cerrar-modal');
    
    cerrarModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Cargar datos iniciales
    mostrarVentas();
});

// Mostrar ventas en la tabla
function mostrarVentas() {
    const listaVentas = document.getElementById('lista-ventas');
    listaVentas.innerHTML = '';
    
    ventas.forEach(venta => {
        const fila = document.createElement('tr');
        const cantidadProductos = venta.productos.reduce((total, producto) => total + producto.cantidad, 0);
        
        fila.innerHTML = `
            <td>${venta.id}</td>
            <td>${venta.cliente}</td>
            <td>${venta.fecha}</td>
            <td>${venta.productos.map(p => p.nombre).join(', ')}</td>
            <td>${cantidadProductos}</td>
            <td>$${venta.total.toLocaleString('es-CL')}</td>
            <td><span class="badge-estado badge-${venta.estado}">${obtenerNombreEstado(venta.estado)}</span></td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-info btn-sm" onclick="verDetalles('${venta.id}')">Detalles</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarVenta('${venta.id}')">Eliminar</button>
                </div>
            </td>
        `;
        listaVentas.appendChild(fila);
    });
}

// Obtener nombre del estado
function obtenerNombreEstado(estado) {
    const estados = {
        'completada': 'Completada',
        'pendiente': 'Pendiente',
        'cancelada': 'Cancelada'
    };
    return estados[estado] || estado;
}

// Ver detalles de venta
function verDetalles(idVenta) {
    const venta = ventas.find(v => v.id === idVenta);
    if (!venta) return;
    
    const modal = document.getElementById('modal-detalles');
    const titulo = document.getElementById('titulo-detalles');
    const contenido = document.getElementById('contenido-detalles');
    
    titulo.textContent = `Detalles de Venta ${venta.id}`;
    
    let html = `
        <p><strong>Cliente:</strong> ${venta.cliente}</p>
        <p><strong>Fecha:</strong> ${venta.fecha}</p>
        <p><strong>Estado:</strong> <span class="badge-estado badge-${venta.estado}">${obtenerNombreEstado(venta.estado)}</span></p>
        <p><strong>Total:</strong> $${venta.total.toLocaleString('es-CL')}</p>
        
        <h5>Productos:</h5>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    venta.productos.forEach(producto => {
        const subtotal = producto.cantidad * producto.precio;
        html += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.precio.toLocaleString('es-CL')}</td>
                <td>$${subtotal.toLocaleString('es-CL')}</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    contenido.innerHTML = html;
    modal.style.display = 'flex';
}

// Eliminar venta y actualizar stock
function eliminarVenta(idVenta) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta venta? Esta acción restaurará el stock de productos.')) {
        return;
    }
    
    const ventaIndex = ventas.findIndex(venta => venta.id === idVenta);
    if (ventaIndex === -1) return;
    
    const venta = ventas[ventaIndex];
    
    // Restaurar stock de productos (en este módulo)
    venta.productos.forEach(productoVenta => {
        const producto = productos.find(p => p.id === productoVenta.id);
        if (producto) {
            producto.stock += productoVenta.cantidad;
        }
    });
    
    // Eliminar la venta
    ventas.splice(ventaIndex, 1);
    
    // Actualizar la vista
    mostrarVentas();
    
    // Mostrar mensaje de éxito
    alert('Venta eliminada correctamente. El stock de productos ha sido restaurado.');
    
    console.log('Stock actualizado localmente. En producción, se sincronizaría con el módulo de productos.');
}

// Editar venta (función de ejemplo)
function editarVenta(idVenta) {
    // Aquí iría la lógica para editar una venta
    alert(`Funcionalidad de edición para venta ${idVenta} en desarrollo`);
}

// Ordenar ventas
function ordenarVentas() {
    const ordenarPor = document.getElementById('ordenar-ventas').value;
    const listaVentas = document.getElementById('lista-ventas');
    const filas = Array.from(listaVentas.querySelectorAll('tr'));
    
    filas.sort((a, b) => {
        const celdasA = a.querySelectorAll('td');
        const celdasB = b.querySelectorAll('td');
        
        switch(ordenarPor) {
            case 'reciente':
                return new Date(celdasB[2].textContent) - new Date(celdasA[2].textContent);
            case 'antiguo':
                return new Date(celdasA[2].textContent) - new Date(celdasB[2].textContent);
            case 'cantidad':
                return parseInt(celdasB[4].textContent) - parseInt(celdasA[4].textContent);
            case 'total':
                return parseFloat(celdasB[5].textContent.replace('$', '').replace(/\./g, '')) - 
                       parseFloat(celdasA[5].textContent.replace('$', '').replace(/\./g, ''));
            default:
                return 0;
        }
    });
    
    // Limpiar y reordenar
    listaVentas.innerHTML = '';
    filas.forEach(fila => listaVentas.appendChild(fila));
}