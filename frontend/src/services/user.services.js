import { api } from '../config';
import http from './http.services';
import { getJwt } from './auth.services';
const { users, userByToken } = api;

http.setJwt(getJwt());

export function getUser() {
  return http.get(userByToken, {
    headers: {
      'x-auth-token': localStorage.token,
    },
  });
}

export function getUsers() {
  return http.get(users, {
    headers: {
      'x-auth-token': localStorage.token,
    },
  });
}

export function saveUser(user) {
  return http.post(users, user, {
    headers: {
      'x-auth-token': localStorage.token,
    },
  });
}

export function removeUser(id) {
  return http.delete(`${users}/${id}`, {
    headers: {
      'x-auth-token': localStorage.token,
    },
  });
}
