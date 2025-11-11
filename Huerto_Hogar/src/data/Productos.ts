export interface Producto{
    id : string,
    nombre : string,
    descripcion : string,
    precio : number,
    imagen : string,
    imagen2 : string,
    imagen3 : string,
    imagen4 : string
    categoria : Categoria
}
export enum Categoria{
    FrutasFrescas='Frutas frescas',
    VerdurasOrganicas='Verduras Organicas',
    ProductosOrganicos='Productos Organicos',
    ProductosLacteos='Productos Lacteos'
}

export const productos:Producto[]=[
    {
        id : "fruit1",
        nombre : 'Manzanas Fuji',
        descripcion : 'Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres. Estas manzanas son conocidas por su textura firme y su sabor equilibrado entre dulce y ácido.',
        precio : 1200,
        imagen : '/manzanafuji1.jpg',
        imagen2 : '/manzanafuji2.jpg',
        imagen3 : '/manzanafuji3.jpg',
        imagen4 : '/manzanafuji4.webp',
        categoria : Categoria.FrutasFrescas
    },
    {
        id : "fruit2",
        nombre : 'Naranjas Valencianas',
        descripcion : 'Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas que aseguran su dulzura y jugosidad',
        precio : 1000,
        imagen : '/naranja1_1.webp',
        imagen2 : '/naranja1.jpg',
        imagen3 : '/naranja4.jpg',
        imagen4 : '/naranja1.jpg',
        categoria : Categoria.FrutasFrescas
    },
    {
        id : "fruit3",
        nombre : 'Platanos Cavendish',
        descripcion : 'Plátanos maduros y dulces, perfectos para el desayuno o como snack energético. Estos plátanos son ricos en potasio y vitaminas, ideales para mantener una dieta equilibrada.',
        precio : 800,
        imagen : '/banana1.jpg',
        imagen2 : '/banana2.webp',
        imagen3 : '/banana3.jpeg',
        imagen4 : '/banana4.webp',
        categoria : Categoria.FrutasFrescas
    },
    {
        id : "verdura1",
        nombre : 'Zanahorias Organicas',
        descripcion : 'Zanahorias crujientes cultivadas sin pesticidas en la Región de O\'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas, jugos o como snack saludable.',
        precio : 900,
        imagen : '/verdura1.jpg',
        imagen2 : '/zanahoria2.jfif',
        imagen3 : '/zanahoria3.webp',
        imagen4 : '/zanahoria4.jpg',
        categoria : Categoria.VerdurasOrganicas
    },
    {
        id : "verdura2",
        nombre : 'Espinacas frescas',
        descripcion : 'Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes. Estas espinacas son cultivadas bajo prácticas orgánicas que garantizan su calidad y valor nutricional',
        precio : 700,
        imagen : '/espinaca1.jpg',
        imagen2 : '/espinaca2.webp',
        imagen3 : '/espinaca3.jpg',
        imagen4 : '/espinaca4.jfif',
        categoria : Categoria.VerdurasOrganicas
    },
    {
        id : "verdura3",
        nombre : 'Pimientos Tricolores',
        descripcion : 'Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas, estos pimientos añaden un toque vibrante y saludable a cualquier receta',
        precio : 1500,
        imagen : '/pimientos1.jpg',
        imagen2 : '/pimientos2.jpg',
        imagen3 : '/pimientos3.webp',
        imagen4 : '/pimientos4.webp',
        categoria : Categoria.VerdurasOrganicas
    },
    {
        id : "organicproduct1",
        nombre : 'Miel Organica',
        descripcion : 'Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable, perfecta para endulzar de manera natural tus comidas y bebidas.',
        precio : 5000,
        imagen : '/miel1.jpg',
        imagen2 : '/miel2.jpg',
        imagen3 : '/miel3.jpg',
        imagen4 : '/miel4.webp',
        categoria : Categoria.ProductosOrganicos
    }
]