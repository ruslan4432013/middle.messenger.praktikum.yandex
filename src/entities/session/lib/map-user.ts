import { type UserDto, type User } from '../types';

export const mapUser = (dto: UserDto): User => ({
  login: dto.login,
  avatar: dto.avatar,
  email: dto.email,
  displayName: dto.display_name,
  id: dto.id,
  phone: dto.phone,
  firstName: dto.first_name,
  secondName: dto.second_name,
});

export const userMapper: Record<string, keyof User> = {
  phone: 'phone',
  second_name: 'secondName',
  first_name: 'firstName',
  email: 'email',
  avatar: 'avatar',
  login: 'login',
  display_name: 'displayName',
  id: 'id',
};
