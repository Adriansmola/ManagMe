import axios from 'axios';
import { LoginData, AuthResponse } from '../types/auth';

const API_URL = 'http://localhost:3000/api/auth';

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/login`, data);
  return response.data;
};