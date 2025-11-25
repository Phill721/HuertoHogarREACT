const API_URL = 'http://localhost:8080/api/productos';

async function request(path = '', options = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text();
    const err = new Error(`HTTP ${res.status}: ${text}`);
    err.status = res.status;
    throw err;
  }
  if (res.status === 204) return null;
  return res.json();
}

const create = async (data) => {
  return request(API_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

const getAll = async () => {
  return request(API_URL, { method: 'GET' });
};

const getById = async (id) => {
  return request(`${API_URL}/${id}`, { method: 'GET' });
};

const update = async (id, data) => {
  return request(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

const remove = async (id) => {
  return request(`${API_URL}/${id}`, { method: 'DELETE' });
};

export default { create, getAll, getById, update, remove };
