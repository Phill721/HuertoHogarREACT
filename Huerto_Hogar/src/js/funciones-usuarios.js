// Actualizar las comunas según la región seleccionada
function actualizarComunas(region) {
    const selectComuna = document.getElementById('comuna-usuario');
    selectComuna.innerHTML = '';
    
    if (region && regionesYComunas[region]) {
        // Habilitar el select de comuna
        selectComuna.disabled = false;
        
        // Agregar opción por defecto
        const opcionDefault = document.createElement('option');
        opcionDefault.value = '';
        opcionDefault.textContent = 'Selecciona una comuna';
        selectComuna.appendChild(opcionDefault);
        
        // Agregar las comunas de la región seleccionada (ordenadas alfabéticamente)
        const comunas = regionesYComunas[region];
        comunas.sort().forEach(comuna => {
            const opcion = document.createElement('option');
            opcion.value = comuna.toLowerCase().replace(/\s+/g, '-');
            opcion.textContent = comuna;
            selectComuna.appendChild(opcion);
        });
    } else {
        // Deshabilitar el select de comuna
        selectComuna.disabled = true;
        
        const opcionDefault = document.createElement('option');
        opcionDefault.value = '';
        opcionDefault.textContent = 'Primero selecciona una región';
        selectComuna.appendChild(opcionDefault);
    }
}

// Mostrar usuarios en la tabla
function mostrarUsuarios() {
    const listaUsuarios = document.getElementById('lista-usuarios');
    listaUsuarios.innerHTML = '';
    
    usuarios.forEach(usuario => {
        const telefono = usuario.telefono || 'No especificado';
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.email}</td>
            <td>${telefono}</td>
            <td>${obtenerNombreRegion(usuario.region)}</td>
            <td>${obtenerNombreComuna(usuario.comuna)}</td>
            <td>
                <div class="btn-group">
                    <button class="btn btn-primary btn-sm" onclick="editarUsuario(${usuario.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
                </div>
            </td>
        `;
        listaUsuarios.appendChild(fila);
    });
}

// Guardar usuario (nuevo o editado)
function guardarUsuario() {
    const idUsuario = document.getElementById('id-usuario').value;
    const nombre = document.getElementById('nombre-usuario').value;
    const email = document.getElementById('email-usuario').value;
    const esEdicion = document.getElementById('es-edicion').value === 'true';
    const telefono = document.getElementById('telefono-usuario').value;
    const region = document.getElementById('region-usuario').value;
    const comuna = document.getElementById('comuna-usuario').value;
    
    let contrasena = '';
    
    if (esEdicion) {
        // Para edición: mantener la contraseña actual o usar la nueva si se proporciona
        const usuarioExistente = usuarios.find(u => u.id == idUsuario);
        const nuevaContrasena = document.getElementById('nueva-contrasena').value;
        
        contrasena = nuevaContrasena ? nuevaContrasena : usuarioExistente.contrasena;
    } else {
        // Para nuevo usuario: usar la contraseña proporcionada
        contrasena = document.getElementById('contrasena-usuario').value;
    }
    
    if (idUsuario) {
        // Editar usuario existente
        const indice = usuarios.findIndex(usuario => usuario.id == idUsuario);
        if (indice !== -1) {
            usuarios[indice] = { 
                id: parseInt(idUsuario), 
                nombre, 
                email, 
                contrasena, 
                telefono, 
                region, 
                comuna 
            };
        }
    } else {
        // Agregar nuevo usuario
        const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
        usuarios.push({ 
            id: nuevoId, 
            nombre, 
            email, 
            contrasena, 
            telefono, 
            region, 
            comuna 
        });
    }
    
    mostrarUsuarios();
    reiniciarFormularioUsuario();
    document.getElementById('formulario-usuario-container').classList.remove('mostrar');
    alert(idUsuario ? 'Usuario actualizado correctamente' : 'Usuario agregado correctamente');
}

// Editar usuario
function editarUsuario(id) {
    const usuario = usuarios.find(u => u.id === id);
    if (usuario) {
        document.getElementById('id-usuario').value = usuario.id;
        document.getElementById('es-edicion').value = 'true';
        document.getElementById('nombre-usuario').value = usuario.nombre;
        document.getElementById('email-usuario').value = usuario.email;
        document.getElementById('telefono-usuario').value = usuario.telefono || '';
        document.getElementById('region-usuario').value = usuario.region;
        
        // Ocultar campos de contraseña para nuevo usuario, mostrar para edición
        document.getElementById('campos-contrasena-nuevo').style.display = 'none';
        document.getElementById('campos-contrasena-edicion').style.display = 'block';
        
        // Actualizar las comunas según la región
        actualizarComunas(usuario.region);
        
        // Esperar a que se actualicen las opciones de comuna
        setTimeout(() => {
            document.getElementById('comuna-usuario').value = usuario.comuna;
        }, 100);
        
        document.getElementById('titulo-formulario-usuario').textContent = 'Editar Usuario';
        document.getElementById('boton-enviar-usuario').textContent = 'Actualizar Usuario';
        document.getElementById('formulario-usuario-container').classList.add('mostrar');
        
        // Scroll al formulario
        document.getElementById('formulario-usuario-container').scrollIntoView({ behavior: 'smooth' });
    }
}

// Eliminar usuario
function eliminarUsuario(id) {
    if (confirm('¿Estas seguro de que quieres eliminar este usuario?')) {
        const indice = usuarios.findIndex(usuario => usuario.id === id);
        if (indice !== -1) {
            usuarios.splice(indice, 1);
            mostrarUsuarios();
            alert('Usuario eliminado correctamente');
        }
    }
}

// Resetear formulario de usuario
function reiniciarFormularioUsuario() {
    document.getElementById('formulario-usuario').reset();
    document.getElementById('id-usuario').value = '';
    document.getElementById('es-edicion').value = 'false';
    document.getElementById('titulo-formulario-usuario').textContent = 'Agregar Nuevo Usuario';
    document.getElementById('boton-enviar-usuario').textContent = 'Guardar Usuario';
    
    // Mostrar campos de contraseña para nuevo usuario, ocultar para edición
    document.getElementById('campos-contrasena-nuevo').style.display = 'block';
    document.getElementById('campos-contrasena-edicion').style.display = 'none';
    
    // Deshabilitar y resetear el select de comuna
    const selectComuna = document.getElementById('comuna-usuario');
    selectComuna.disabled = true;
    selectComuna.innerHTML = '';
    const opcionDefault = document.createElement('option');
    opcionDefault.value = '';
    opcionDefault.textContent = 'Primero selecciona una región';
    selectComuna.appendChild(opcionDefault);
    
    // Ocultar mensajes de error
    document.querySelectorAll('.mensaje-error').forEach(el => {
        el.style.display = 'none';
    });
}