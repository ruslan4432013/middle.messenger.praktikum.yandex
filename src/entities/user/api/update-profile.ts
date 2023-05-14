import { apiInstance } from '@shared/api';

import type { UserDto } from './types';

const BASE_URL = '/user/profile';

export type UpdateProfileParams = {
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
};

export const updateProfile = async (params: UpdateProfileParams) => {
  const res = await apiInstance.put(BASE_URL, {
    data: params,
    headers: {
      'content-type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(res.json().reason);
  }
  return res.json<UserDto>();
};
