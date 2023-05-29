import { apiInstance } from '@shared/api';

import { type UserDto } from './types';

const BASE_URL = '/user/search';

type SearchParams = {
  login: string
};

export const getUsersByLogin = async (params: SearchParams) => {
  const res = await apiInstance.post(BASE_URL, {
    data: params,
  });
  if (res.ok) {
    return res.json<UserDto[]>();
  }
  throw new Error(res.json().reason);
};
