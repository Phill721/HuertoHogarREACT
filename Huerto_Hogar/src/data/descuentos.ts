export interface DiscountCode {
    id: number;
    nombre: string;
    codigo: string;
    porcentaje: number; // Ej: 10 = 10% de descuento
}

export const discountCodes: DiscountCode[] = [
    { id: 1, nombre: "Descuento de bienvenida", codigo: "BIENVENIDO10", porcentaje: 10 },
    { id: 2, nombre: "Viernes verde", codigo: "GREENFRIDAY20", porcentaje: 20 },
    { id: 3, nombre: "Recompensa fiel", codigo: "CLIENTEVIP15", porcentaje: 15 },
];
