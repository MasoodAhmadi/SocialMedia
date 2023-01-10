import { api } from '../config';
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
  if (user.id) {
    const body = { ...user };
    delete body.id;
    return http.put(`${users}/${user.id}`, body, {
      headers: {
        'x-auth-token': localStorage.token,
      },
    });
  }
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

// import { BehaviorSubject } from "rxjs";
// import Router from "next/router";

// const userSubject = new BehaviorSubject(
//   process.browser && JSON.parse(localStorage.getItem("user"))
// );

// export const userService = {
//   user: userSubject.asObservable(),
//   get userValue() {
//     return userSubject.value;
//   },
//   login,
//   logout,
//   getAll,
// };

// function login(username, password) {
//   return fetchWrapper
//     .post("https://localhost:8000/api/users/signin", { username, password })
//     .then((user) => {
//       // publish user to subscribers and store in local storage to stay logged in between page refreshes
//       userSubject.next(user);
//       localStorage.setItem("user", JSON.stringify(user));

//       return user;
//     });
// }

// function logout() {
//   // remove user from local storage, publish null to user subscribers and redirect to login page
//   localStorage.removeItem("user");
//   userSubject.next(null);
//   Router.push("/login");
// }

// function getAll() {
//   return axios.get("https://localhost:8000/api/users/signin");
// }
