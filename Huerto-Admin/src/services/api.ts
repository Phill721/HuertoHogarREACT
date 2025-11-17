import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { Producto } from '../types/producto';
import type { Usuario } from '../types/usuario';
import type { Venta } from '../types/venta';
import { getProductos, setProductos, getUsuarios, setUsuarios, getVentas } from '../data/storage';

const BASE = (import.meta.env.VITE_API_BASE as string) || '';
const client: AxiosInstance | null = BASE ? axios.create({ baseURL: BASE, timeout: 5000 }) : null;

function axiosErrorMessage(err: unknown): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyErr = err as any;
  if (anyErr?.response?.data) return JSON.stringify(anyErr.response.data);
  if (anyErr?.message) return anyErr.message;
  return String(err);
}

// Productos
export async function fetchProductos(): Promise<Producto[]> {
  if (!client) return Promise.resolve(getProductos());
  try {
    const res = await client.get<Producto[]>('/productos');
    return res.data;
  } catch (e) {
    throw new Error(axiosErrorMessage(e));
  }
}

export async function createProducto(p: Producto): Promise<Producto> {
  if (!client) {
    const productos = getProductos();
    const nuevo = { ...p, id: Date.now().toString() } as Producto;
    const nuevos = [...productos, nuevo];
    setProductos(nuevos);
    return Promise.resolve(nuevo);
  }
  try {
    const res = await client.post<Producto>('/productos', p);
    return res.data;
  } catch (e) {
    throw new Error(axiosErrorMessage(e));
  }
}

export async function updateProducto(id: string | number, p: Producto): Promise<Producto> {
  if (!client) {
    const productos = getProductos();
    const updated = productos.map(x => x.id === id ? p : x);
    setProductos(updated);
    return Promise.resolve(p);
  }
  try {
    const res = await client.put<Producto>(`/productos/${id}`, p);
    return res.data;
  } catch (e) {
    throw new Error(axiosErrorMessage(e));
  }
}

export async function deleteProducto(id: string | number): Promise<void> {
  if (!client) {
    const productos = getProductos().filter(p => p.id !== id);
    setProductos(productos);
    return Promise.resolve();
  }
  try {
    await client.delete<void>(`/productos/${id}`);
  } catch (e) {
    throw new Error(axiosErrorMessage(e));
  }
}

// Usuarios (simple wrappers)
export async function fetchUsuarios(): Promise<Usuario[]> {
  if (!client) return Promise.resolve(getUsuarios());
  try {
    const res = await client.get<Usuario[]>('/usuarios');
    return res.data;
  } catch (e) {
    throw new Error(axiosErrorMessage(e));
  }
}

export async function createUsuario(u: Usuario): Promise<Usuario> {
  if (!client) {
    const usuarios = getUsuarios();
    const nuevo = { ...u, id: Date.now().toString() } as Usuario;
    const nuevos = [...usuarios, nuevo];
    setUsuarios(nuevos);
    return Promise.resolve(nuevo);
  }
  try {
    const res = await client.post<Usuario>('/usuarios', u);
    return res.data;
  } catch (e) {
    throw new Error(axiosErrorMessage(e));
  }
}

export async function updateUsuario(id: string | number, u: Usuario): Promise<Usuario> {
  if (!client) {
    const usuarios = getUsuarios();
    const updated = usuarios.map(x => x.id === id ? u : x);
    setUsuarios(updated);
    return Promise.resolve(u);
  }
  try {
    const res = await client.put<Usuario>(`/usuarios/${id}`, u);
    return res.data;
  } catch (e) {
    throw new Error(axiosErrorMessage(e));
  }
}

export async function deleteUsuario(id: string | number): Promise<void> {
  if (!client) {
    const usuarios = getUsuarios().filter(p => p.id !== id);
    setUsuarios(usuarios);
    return Promise.resolve();
  }
  try {
    await client.delete<void>(`/usuarios/${id}`);
  } catch (e) {
    throw new Error(axiosErrorMessage(e));
  }
}

export async function fetchVentas(): Promise<Venta[]> {
  if (!client) return Promise.resolve(getVentas());
  try {
    const res = await client.get<Venta[]>('/ventas');
    return res.data;
  } catch (e) {
    throw new Error(axiosErrorMessage(e));
  }
}

export default {
  fetchProductos,
  createProducto,
  updateProducto,
  deleteProducto,
  fetchUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  fetchVentas
};
