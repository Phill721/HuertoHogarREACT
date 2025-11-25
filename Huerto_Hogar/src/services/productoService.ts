import axios from 'axios';

const API_URL = 'http://localhost:8080/api/productos';

export type ProductoPayload = {
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
  descripcion?: string;
  activo?: boolean;
};

export type ProductoResponse = ProductoPayload & { id: number };

const create = async (data: ProductoPayload): Promise<ProductoResponse> => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

const getAll = async (): Promise<ProductoResponse[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getById = async (id: string | number): Promise<ProductoResponse> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const update = async (id: string | number, data: ProductoPayload): Promise<ProductoResponse> => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

const remove = async (id: string | number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export default {
  create,
  getAll,
  getById,
  update,
  remove,
};
