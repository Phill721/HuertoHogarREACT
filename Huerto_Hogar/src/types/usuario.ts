// src/huerto-admin/types/usuario.ts
export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  password?: string;
  rol: 'admin' | 'user';
  activo: boolean;
}
