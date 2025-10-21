// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Botones para mostrar formularios
    document.getElementById('boton-agregar-producto').addEventListener('click', function() {
        reiniciarFormularioProducto();
        document.getElementById('formulario-producto-container').classList.add('mostrar');
    });

    // Botones de cancelar
    document.getElementById('boton-cancelar-producto').addEventListener('click', function() {
        document.getElementById('formulario-producto-container').classList.remove('mostrar');
    });

    // Validación de formulario de productos
    const formularioProducto = document.getElementById('formulario-producto');
    formularioProducto.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validarFormularioProducto()) {
            guardarProducto();
        }
    });

    // Cargar datos iniciales
    mostrarProductos();
});