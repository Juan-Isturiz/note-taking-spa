import {
  AuthResponseDTO,
  Category,
  CreateCategoryDTO,
  CreateNoteDTO,
  FilterNoteDTO,
  LoginUserDTO,
  PaginatedNoteDTO,
  UpdateNoteDTO,
} from '@repo/schemas';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    return Promise.reject(error.response);
  }
);

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const api = {
  /**
   * Filter notes based on the provided data.
   * @param {FilterNoteDTO} data - Data to filter notes by.
   * @returns {Promise<PaginatedNoteDTO>} - Promise that resolves with a PaginatedNoteDTO containing the filtered notes.
   */
  filterNotes: async (data: FilterNoteDTO): Promise<PaginatedNoteDTO> => {
    const response = await apiClient.get<PaginatedNoteDTO>('/notes', {
      params: data,
    });
    return response.data;
  },
  /**
   * Update a note with the provided id and data.
   * @param {string} id - ID of the note to update.
   * @param {UpdateNoteDTO} data - Data to update the note with.
   * @returns {Promise<UpdateNoteDTO>} - Promise that resolves with the updated note data.
   */
  updateNote: async (id: string, data: UpdateNoteDTO) => {
    const response = await apiClient.put<UpdateNoteDTO>(`/notes/${id}`, data);
    return response.data;
  },
  /**
   * Create a new note with the provided data.
   * @param {CreateNoteDTO} data - Data to create the note with.
   * @returns {Promise<CreateNoteDTO>} - Promise that resolves with the created note data.
   */
  createNote: async (data: Omit<CreateNoteDTO, 'userId'>) => {
    const response = await apiClient.post<CreateNoteDTO>('/notes', data);
    return response.data;
  },
  /**
   * Delete a note with the provided ID.
   * @param {string} id - ID of the note to delete.
   * @returns {Promise<void>} - Promise that resolves with no value once the note has been deleted.
   */
  deleteNote: async (id: string) => {
    const response = await apiClient.delete(`/notes/${id}`);
    return response.data;
  },

  /**
   * Logs in a user with the provided credentials.
   * @param {LoginUserDTO} credentials - Credentials to log in with.
   * @returns {Promise<AuthResponseDTO>} - Promise that resolves with the logged in user's data.
   */
  login: async (credentials: LoginUserDTO) => {
    const { data } = await apiClient.post<AuthResponseDTO>(
      '/auth/login',
      credentials
    );
    return data;
  },
  /**
   * Get all categories.
   * @returns {Promise<Category[]>} - Promise that resolves with an array of all categories.
   */
  getCategories: async (): Promise<Category[]> => {
    const { data } = await apiClient.get('/categories');
    return data;
  },

  /**
   * Creates a new category with the provided data.
   * @param {CreateCategoryDTO} categoryData - Data to create the category with.
   * @returns {Promise<Category>} - Promise that resolves with the created category data.
   */
  createCategory: async (
    categoryData: CreateCategoryDTO
  ): Promise<Category> => {
    const { data } = await apiClient.post('/categories', categoryData);
    return data;
  },
};
