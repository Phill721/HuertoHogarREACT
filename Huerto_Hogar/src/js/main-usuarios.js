// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Configurar evento para cambio de región
    const selectRegion = document.getElementById('region-usuario');
    const selectComuna = document.getElementById('comuna-usuario');
    
    selectRegion.addEventListener('change', function() {
        const region = this.value;
        actualizarComunas(region);
    });

    // Botones para mostrar formularios
    document.getElementById('boton-agregar-usuario').addEventListener('click', function() {
        reiniciarFormularioUsuario();
        document.getElementById('formulario-usuario-container').classList.add('mostrar');
    });

    // Botones de cancelar
    document.getElementById('boton-cancelar-usuario').addEventListener('click', function() {
        document.getElementById('formulario-usuario-container').classList.remove('mostrar');
    });

    // Validación de formulario de usuario
    const formularioUsuario = document.getElementById('formulario-usuario');
    formularioUsuario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validarFormularioUsuario()) {
            guardarUsuario();
        }
    });

    // Cargar datos iniciales
    mostrarUsuarios();
});