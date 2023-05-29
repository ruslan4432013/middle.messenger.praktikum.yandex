import { apiInstance } from '@shared/api';

import { type UserDto } from './types';

import { mapUser } from '../lib';

const BASE_URL = '/auth/user';

export const getMe = async () => {
  const res = await apiInstance.get(BASE_URL, {
    headers: {
      'content-type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(res.data);
  }
  return mapUser(res.json<UserDto>());
};
