const API = 'http://localhost:8080/api/ventas';

async function request(path = '', options: RequestInit = {}) {
  const res = await fetch(path, { headers: { 'Content-Type': 'application/json' }, ...options });
  if (!res.ok) {
    const text = await res.text(); throw new Error(`HTTP ${res.status}: ${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

const getAll = async () => request(API, { method: 'GET' });
const getById = async (id: string | number) => request(`${API}/${id}`, { method: 'GET' });
const create = async (data: any) => request(API, { method: 'POST', body: JSON.stringify(data) });
const remove = async (id: string | number) => request(`${API}/${id}`, { method: 'DELETE' });

export default { getAll, getById, create, remove };
