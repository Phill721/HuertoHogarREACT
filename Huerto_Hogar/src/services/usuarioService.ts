export type UsuarioPayload = {
  nombre: string;
  email: string;
  password?: string;
  rol?: 'admin' | 'user';
  activo?: boolean;
};

export type UsuarioResponse = UsuarioPayload & { id: number };

const API = 'http://localhost:8080/api/usuarios';

async function request(path = '', options: RequestInit = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    const err = new Error(`HTTP ${res.status}: ${text}`);
    throw err;
  }
  if (res.status === 204) return null;
  return res.json();
}

const getAll = async (): Promise<UsuarioResponse[]> => {
  return request(API, { method: 'GET' });
};

const create = async (data: UsuarioPayload): Promise<UsuarioResponse> => {
  return request(API, { method: 'POST', body: JSON.stringify(data) });
};

const login = async (email: string, password: string): Promise<UsuarioResponse> => {
  return request(`${API}/login`, { method: 'POST', body: JSON.stringify({ email, password }) });
};

const update = async (id: string | number, data: UsuarioPayload): Promise<UsuarioResponse> => {
  return request(`${API}/${id}`, { method: 'PUT', body: JSON.stringify(data) });
};

const remove = async (id: string | number): Promise<void> => {
  return request(`${API}/${id}`, { method: 'DELETE' });
};

export default { getAll, create, update, remove, login };
