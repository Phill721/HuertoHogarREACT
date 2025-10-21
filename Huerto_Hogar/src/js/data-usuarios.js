// Datos de ejemplo
let usuarios = [
    { id: 1, nombre: "Ana Torres", email: "ana.torres@ejemplo.com", telefono: "+56 9 1234 5678", region: "metropolitana", comuna: "las-condes", contrasena: "contraseña123" },
    { id: 2, nombre: "Carlos Ruiz", email: "carlos.ruiz@gmail.com", telefono: "", region: "valparaiso", comuna: "valparaiso", contrasena: "miClave456" },
    { id: 3, nombre: "María López", email: "maria.lopez@profesor.duoc.cl", telefono: "+56 9 8765 4321", region: "bio-bio", comuna: "concepcion", contrasena: "securePass789" }
];

// Datos de regiones y comunas
const regionesYComunas = {
    'metropolitana': ['Las Condes', 'Providencia', 'Santiago'],
    'valparaiso': ['Valparaíso', 'Viña del Mar'],
    'bio-bio': ['Concepción', 'Talcahuano']
};

// Obtener nombre de región
function obtenerNombreRegion(idRegion) {
    const regiones = {
        'metropolitana': 'Región Metropolitana',
        'valparaiso': 'Región de Valparaíso',
        'bio-bio': 'Región del Biobío'
    };
    return regiones[idRegion] || idRegion;
}

// Obtener nombre de comuna
function obtenerNombreComuna(idComuna) {
    // Convertir el ID de comuna a formato legible
    const comunas = {
        'santiago': 'Santiago',
        'providencia': 'Providencia',
        'las-condes': 'Las Condes',
        'valparaiso': 'Valparaíso',
        'vina-del-mar': 'Viña del Mar',
        'concepcion': 'Concepción',
        'talcahuano': 'Talcahuano'
    };
    return comunas[idComuna] || idComuna;
}