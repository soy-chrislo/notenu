const API_URL = 'http://localhost:3000/api/login/';

const signup = (username: string, password: string) => {
  // ! No existe la ruta todavia ni la logica de registro.
  return fetch(API_URL + 'signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(response);
    })
}

const login = (username: string, password: string) => {
  return fetch(API_URL + '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

const logout = () => {
  localStorage.removeItem('user');
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user') || '{}');
}

export default {
  signup,
  login,
  logout,
  getCurrentUser
}