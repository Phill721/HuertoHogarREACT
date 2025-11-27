import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export type LoginResponse = {
  accessToken: string;
  email: string;
  rol?: string;
};

const login = async (email: string, password: string): Promise<LoginResponse> => {
  const resp = await axios.post(`${API_URL}/login`, { email, password });
  const data = resp.data as LoginResponse;
  if (data && data.accessToken) {
    localStorage.setItem('accessToken', data.accessToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
  }
  return data;
};

const logout = () => {
  localStorage.removeItem('accessToken');
  delete axios.defaults.headers.common['Authorization'];
};

const getToken = () => localStorage.getItem('accessToken');

// On module init, attach token if exists
const init = () => {
  const token = getToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

init();

export default { login, logout, getToken };
