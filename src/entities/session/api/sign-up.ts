import { apiInstance } from '@shared/api';

import { type SignUpDto } from './types';

type SignUpBody = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
};

const BASE_URL = '/auth/signup';

export const signUpUser = async (body: SignUpBody) => {
  const res = await apiInstance.post(BASE_URL, {
    data: body,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(res.json().reason);
  }
  return res.json<SignUpDto>();
};
