const API = 'http://localhost:8080/api/carrito';

async function request(path = '', options: RequestInit = {}) {
  const token = localStorage.getItem('accessToken') || localStorage.getItem('access_token') || null;
  const headers: Record<string,string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(path, { headers, ...options });
  if (!res.ok) {
    const text = await res.text(); throw new Error(`HTTP ${res.status}: ${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

const getCart = async (usuarioId: string | number) => request(`${API}/${usuarioId}`, { method: 'GET' });
const addItem = async (usuarioId: string | number, item: any) => request(`${API}/${usuarioId}/items`, { method: 'POST', body: JSON.stringify(item) });
const removeItem = async (usuarioId: string | number, itemId: string | number) => request(`${API}/${usuarioId}/items/${itemId}`, { method: 'DELETE' });
const checkout = async (usuarioId: string | number, items?: any[]) => request(`${API}/${usuarioId}/checkout`, { method: 'POST', body: JSON.stringify(items ? items : {}) });

export default { getCart, addItem, removeItem, checkout };
