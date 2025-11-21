import axios from 'axios';
import type { User } from '../model/User';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const fetchUsers = async () => {
  const { data } = await apiClient.get<User[]>('/data/users');
  return data;
};

export const createUser = async (payload: Pick<User, 'name' | 'status'>) => {
  const { data } = await apiClient.post<User>('/data/users', payload);
  return data;
};
