import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  googleLogin: async (userData: any) => {
    const response = await api.post('/api/auth/google', userData);
    return response.data;
  },
};

export const customers = {
  getAll: async () => {
    const response = await api.get('/api/customers');
    return response.data;
  },
  create: async (customerData: any) => {
    const response = await api.post('/api/customers', customerData);
    return response.data;
  },
  update: async (id: string, customerData: any) => {
    const response = await api.put(`/api/customers/${id}`, customerData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/api/customers/${id}`);
    return response.data;
  },
};

export const campaigns = {
  getAll: async () => {
    const response = await api.get('/api/campaigns');
    return response.data;
  },
  create: async (campaignData: any) => {
    const response = await api.post('/api/campaigns', campaignData);
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/api/campaigns/${id}`);
    return response.data;
  },
};

export const segments = {
  getAll: async () => {
    const response = await api.get('/api/segments');
    return response.data;
  },
  create: async (segmentData: any) => {
    const response = await api.post('/api/segments', segmentData);
    return response.data;
  },
  calculateAudience: async (rules: any) => {
    const response = await api.post('/api/segments/calculate', { rules });
    return response.data;
  },
};

export default api;