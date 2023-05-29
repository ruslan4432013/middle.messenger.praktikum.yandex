import { apiInstance } from '@shared/api';

const BASE_URL = '/auth/signin';

type LoginParams = {
  login: string;
  password: string;
};

export const login = async (params: LoginParams) => {
  const res = await apiInstance.post(BASE_URL, {
    data: params,
  });
  if (!res.ok) {
    throw new Error(res.json().reason);
  }
  return res;
};
