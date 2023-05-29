import { apiInstance } from '@shared/api';

const BASE_URL = '/user/password';

type ChangePasswordParams = {
  oldPassword: string,
  newPassword: string
};

export const changePassword = (params: ChangePasswordParams) => apiInstance.put(BASE_URL, {
  data: params,
});
