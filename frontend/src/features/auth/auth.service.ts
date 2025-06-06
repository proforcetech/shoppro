// src/features/auth/auth.service.ts
import api from '../../api/axios';

export const login = async (email: string, password: string) => {
  const res = await api.post('/auth/login', { email, password });
  const { accessToken } = res.data;
  localStorage.setItem('token', accessToken);
  return accessToken;
};
