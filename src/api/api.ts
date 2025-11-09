import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/v1',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

// ===== Types =====
export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserPayload = {
  email: string;
  firstName: string;
  lastName?: string;
};

export type UpdateUserPayload = Partial<Pick<CreateUserPayload, 'firstName' | 'lastName'>>;

export const usersApi = {
 
  async list(skip = 0, take = 10, search?: string): Promise<User[]> {
    const params: Record<string, string | number> = { skip, take };
    if (search && search.trim().length > 0) params['search'] = search.trim();
    const { data } = await api.get<User[]>('/users', { params });
    return data;
  },

  async get(id: number): Promise<User> {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  async create(payload: CreateUserPayload): Promise<User> {
    const { data } = await api.post<User>('/users', payload);
    return data;
  },

  async update(id: number, payload: UpdateUserPayload): Promise<User> {
    const { data } = await api.put<User>(`/users/${id}`, payload);
    return data;
  },

  async remove(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};

export default api;
