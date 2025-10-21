// Validar formulario de producto
function validarFormularioProducto() {
    let esValido = true;
    const nombre = document.getElementById('nombre-producto');
    const categoria = document.getElementById('categoria-producto');
    const precio = document.getElementById('precio-producto');
    const stock = document.getElementById('stock-producto');
    
    // Validar nombre
    if (!nombre.value.trim()) {
        document.getElementById('error-nombre-producto').style.display = 'block';
        esValido = false;
    } else {
        document.getElementById('error-nombre-producto').style.display = 'none';
    }
    
    // Validar categoría
    if (!categoria.value) {
        document.getElementById('error-categoria-producto').style.display = 'block';
        esValido = false;
    } else {
        document.getElementById('error-categoria-producto').style.display = 'none';
    }
    
    // Validar precio (puede ser 0 o mayor)
    if (!precio.value || precio.value < 0) {
        document.getElementById('error-precio-producto').style.display = 'block';
        esValido = false;
    } else {
        document.getElementById('error-precio-producto').style.display = 'none';
    }
    
    // Validar stock (puede ser 0 o mayor)
    if (!stock.value || stock.value < 0) {
        document.getElementById('error-stock-producto').style.display = 'block';
        esValido = false;
    } else {
        document.getElementById('error-stock-producto').style.display = 'none';
    }
    
    return esValido;
}