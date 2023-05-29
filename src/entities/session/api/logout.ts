import { apiInstance } from '@shared/api';

const BASE_URL = '/auth/logout';

export const logout = () => apiInstance.post(BASE_URL);
