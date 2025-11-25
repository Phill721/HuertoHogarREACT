declare module '../services/productoService' {
  export type ProductoPayload = {
    nombre: string;
    categoria: string;
    precio: number;
    stock: number;
    descripcion?: string;
    activo?: boolean;
  };

  export type ProductoResponse = ProductoPayload & { id: number };

  const productoService: {
    create(data: ProductoPayload): Promise<ProductoResponse>;
    getAll(): Promise<ProductoResponse[]>;
    getById(id: string | number): Promise<ProductoResponse>;
    update(id: string | number, data: ProductoPayload): Promise<ProductoResponse>;
    remove(id: string | number): Promise<void>;
  };

  export default productoService;
}
