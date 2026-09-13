const defaultApiBaseUrl = '/api';

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl).replace(/\/$/, '');

export function apiUrl(path: string): string {
  return `${API_BASE_URL}/${path.replace(/^\//, '')}`;
}
