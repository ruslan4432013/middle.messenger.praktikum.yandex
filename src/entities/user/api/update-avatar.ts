import { apiInstance } from '@shared/api';

import type { UserDto } from './types';

const BASE_URL = '/user/profile/avatar';

export type UpdateAvatarParams = {
  avatar: File
};

export const updateAvatar = async (params: UpdateAvatarParams) => {
  const formData = new FormData();
  formData.set('avatar', params.avatar);
  const res = await apiInstance.put(BASE_URL, {
    data: formData,
  });
  if (!res.ok) {
    throw new Error(res.json().reason);
  }
  return res.json<UserDto>();
};
