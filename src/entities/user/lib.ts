import { type User } from '@shared/api';
import { connect, store } from '@shared/lib';

import { type UserDto } from './types';

export const connectUsers = connect((state) => ({ users: state.users }));
export const connectUser = connect((state) => ({ user: state.user }));

export const setUsers = (users: UserDto[]) => store.set('users', users);

export const setUser = (user: User) => store.set('user', user);

declare global {
  interface StateStore {
    users: UserDto[];
    user: User;
  }
}
