import { type UpdateProfileParams } from '@entities/user';

export const getUpdateParams = (formData: FormData): UpdateProfileParams => {
  const firstName = formData.get('first_name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const login = formData.get('login') as string;
  const secondName = formData.get('second_name') as string;
  const displayName = formData.get('display_name') as string;
  if (!firstName || !email || !phone || !login || !secondName || !displayName) throw new Error('Invalid form data');
  const obj: UpdateProfileParams = {
    first_name: firstName,
    email,
    phone,
    login,
    second_name: secondName,
    display_name: displayName,
  };
  return obj;
};
