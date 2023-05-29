import { API_URL } from '../config';

export const getAvatar = (avatar?: string | null) => (avatar ? `${API_URL}/resources${avatar}` : 'https://via.placeholder.com/34x34');
