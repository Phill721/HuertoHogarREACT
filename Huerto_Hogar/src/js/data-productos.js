// Datos de ejemplo
let productos = [
    { id: 1, nombre: "Manzanas Fuji", categoria: "frutas", precio: 1200, stock: 150, descripcion: "Manzanas Fuji crujientes y dulces" },
    { id: 2, nombre: "Zanahorias Orgánicas", categoria: "verduras", precio: 900, stock: 100, descripcion: "Zanahorias cultivadas sin pesticidas" },
    { id: 3, nombre: "Miel Orgánica", categoria: "organicos", precio: 3500, stock: 50, descripcion: "Miel 100% pura de abejas" },
    { id: 4, nombre: "Queso de Cabra", categoria: "lacteos", precio: 4500, stock: 30, descripcion: "Queso de cabra artesanal" }
];

// Obtener nombre de categoría
function obtenerNombreCategoria(idCategoria) {
    const categorias = {
        'frutas': 'Frutas',
        'verduras': 'Verduras',
        'organicos': 'Productos Orgánicos',
        'lacteos': 'Productos Lácteos'
    };
    return categorias[idCategoria] || idCategoria;
}