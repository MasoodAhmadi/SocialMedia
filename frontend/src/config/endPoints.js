const backend = 'http:localhost:8000';
const api = 'api';
export const endPoints = {
  getallUsers: `${backend}/${api}/users`,
  addUsers: `${backend}/addusers`,
  allData: 'https://deploytoheruku70.herokuapp.com/api/menus',
  loginUrl: `${backend}/auth/signin`,
  getUserByTokenUrl: `${backend}/users/token`,
};
