// proforcetech/shoppro/shoppro-06bf0ed64f7d8a05ba37c69644472fc852ae8c80/frontend/src/features/auth/auth.service.ts

import apiClient from '../../api/client';

const login = async (credentials: { email: string; password: string }) => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

export default {
  login,
};