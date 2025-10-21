// Mostrar productos en la tabla
function mostrarProductos() {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = '';
    
    productos.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${obtenerNombreCategoria(producto.categoria)}</td>
            <td>$${producto.precio.toLocaleString('es-CL')}</td>
            <td>${producto.stock}</td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-primary btn-sm" onclick="editarProducto(${producto.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.id})">Eliminar</button>
                </div>
            </td>
        `;
        listaProductos.appendChild(fila);
    });
}

// Guardar producto (nuevo o editado)
function guardarProducto() {
    const idProducto = document.getElementById('id-producto').value;
    const nombre = document.getElementById('nombre-producto').value;
    const categoria = document.getElementById('categoria-producto').value;
    const precio = parseInt(document.getElementById('precio-producto').value);
    const stock = parseInt(document.getElementById('stock-producto').value);
    const descripcion = document.getElementById('descripcion-producto').value;
    
    if (idProducto) {
        // Editar producto existente
        const indice = productos.findIndex(producto => producto.id == idProducto);
        if (indice !== -1) {
            productos[indice] = { 
                id: parseInt(idProducto), 
                nombre, 
                categoria, 
                precio, 
                stock, 
                descripcion 
            };
        }
    } else {
        // Agregar nuevo producto
        const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
        productos.push({ 
            id: nuevoId, 
            nombre, 
            categoria, 
            precio, 
            stock, 
            descripcion 
        });
    }
    
    mostrarProductos();
    reiniciarFormularioProducto();
    document.getElementById('formulario-producto-container').classList.remove('mostrar');
    alert(idProducto ? 'Producto actualizado correctamente' : 'Producto agregado correctamente');
}

// Editar producto
function editarProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        document.getElementById('id-producto').value = producto.id;
        document.getElementById('nombre-producto').value = producto.nombre;
        document.getElementById('categoria-producto').value = producto.categoria;
        document.getElementById('precio-producto').value = producto.precio;
        document.getElementById('stock-producto').value = producto.stock;
        document.getElementById('descripcion-producto').value = producto.descripcion || '';
        
        document.getElementById('titulo-formulario-producto').textContent = 'Editar Producto';
        document.getElementById('boton-enviar-producto').textContent = 'Actualizar Producto';
        document.getElementById('formulario-producto-container').classList.add('mostrar');
        
        // Scroll al formulario
        document.getElementById('formulario-producto-container').scrollIntoView({ behavior: 'smooth' });
    }
}

// Eliminar producto
function eliminarProducto(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        const indice = productos.findIndex(producto => producto.id === id);
        if (indice !== -1) {
            productos.splice(indice, 1);
            mostrarProductos();
            alert('Se ha eliminado el producto correctamente');
        }
    }
}

// Resetear formulario de producto
function reiniciarFormularioProducto() {
    document.getElementById('formulario-producto').reset();
    document.getElementById('id-producto').value = '';
    document.getElementById('titulo-formulario-producto').textContent = 'Agregar Nuevo Producto';
    document.getElementById('boton-enviar-producto').textContent = 'Guardar Producto';
    
    // Ocultar mensajes de error
    document.querySelectorAll('.mensaje-error').forEach(el => {
        el.style.display = 'none';
    });
}