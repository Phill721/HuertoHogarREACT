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

export type ProductoResponse = ProductoPayload & { id: number; imagen?: string | null; imagen2?: string | null; imagen3?: string | null; imagen4?: string | null };

const create = async (data: ProductoPayload): Promise<ProductoResponse> => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

const createWithImages = async (data: ProductoPayload, files?: (File | null)[]): Promise<ProductoResponse> => {
  const form = new FormData();
  form.append('nombre', String(data.nombre));
  form.append('categoria', String(data.categoria));
  form.append('precio', String(data.precio));
  form.append('stock', String(data.stock));
  if (data.descripcion) form.append('descripcion', String(data.descripcion));
  if (data.activo != null) form.append('activo', String(data.activo));
  if (files && files.length) {
    if (files[0]) form.append('imagen', files[0] as File);
    if (files[1]) form.append('imagen2', files[1] as File);
    if (files[2]) form.append('imagen3', files[2] as File);
    if (files[3]) form.append('imagen4', files[3] as File);
  }
  // Do not set Content-Type header manually; the browser will set the proper multipart boundary
  console.log('productoService.createWithImages: sending multipart form', files);
  const response = await axios.post(API_URL, form);
  console.log('productoService.createWithImages: response status', response.status, response.data);
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

const updateWithImages = async (id: string | number, data: ProductoPayload, files?: (File | null)[]): Promise<ProductoResponse> => {
  const form = new FormData();
  form.append('nombre', String(data.nombre));
  form.append('categoria', String(data.categoria));
  form.append('precio', String(data.precio));
  form.append('stock', String(data.stock));
  if (data.descripcion) form.append('descripcion', String(data.descripcion));
  if (data.activo != null) form.append('activo', String(data.activo));
  if (files && files.length) {
    if (files[0]) form.append('imagen', files[0] as File);
    if (files[1]) form.append('imagen2', files[1] as File);
    if (files[2]) form.append('imagen3', files[2] as File);
    if (files[3]) form.append('imagen4', files[3] as File);
  }
  // Do not set Content-Type header manually; the browser will set the proper multipart boundary
  console.log('productoService.updateWithImages: sending multipart form', id, files);
  const response = await axios.put(`${API_URL}/${id}`, form);
  console.log('productoService.updateWithImages: response status', response.status, response.data);
  return response.data;
};

const uploadImages = async (id: string | number, files?: (File | null)[]): Promise<ProductoResponse> => {
  const form = new FormData();
  if (files && files.length) {
    if (files[0]) form.append('imagen', files[0] as File);
    if (files[1]) form.append('imagen2', files[1] as File);
    if (files[2]) form.append('imagen3', files[2] as File);
    if (files[3]) form.append('imagen4', files[3] as File);
  }
  console.log('productoService.uploadImages: uploading images for', id, files);
  const response = await axios.post(`${API_URL}/${id}/imagenes`, form);
  console.log('productoService.uploadImages: response', response.status, response.data);
  return response.data;
};

const remove = async (id: string | number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export default {
  create,
  createWithImages,
  getAll,
  getById,
  update,
  updateWithImages,
  uploadImages,
  remove,
};
