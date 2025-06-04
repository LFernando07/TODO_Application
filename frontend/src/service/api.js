import axios from 'axios';

const API_URL = 'http://localhost:1234/api';

// Create an axios instance with the base URL and credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const apiService = {
  // Users
  getUserById: (id) => api.get(`/users/${id}`),
  createUser: (data) => api.post('/users', data),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`),

  // Tasks
  getAllTasksByUser: (id) => api.get(`/task/${id}`),
  createTask: (data) => api.post('/task', data),
  updateTask: (id, data) => api.put(`/task/${id}`, data),
  deleteTask: (id) => api.delete(`/task/${id}`),
  changeTaskStatus: (id) => api.put(`/task/complete/${id}`),

  // autentication
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  protected: () => api.get('/auth/protected'),

}