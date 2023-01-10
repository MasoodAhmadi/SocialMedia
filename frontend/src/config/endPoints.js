const backend = 'http://localhost:8000';
const BASE = '/api';
export const endPoints = {
	users: `${BASE}/users`,
	userSignIn: `${BASE}/auth/login`,
  userByToken: `${BASE}/auth/token`,
  allData: 'https://deploytoheruku70.herokuapp.com/api/menus',
};
