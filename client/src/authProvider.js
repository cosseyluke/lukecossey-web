import { AuthProvider } from 'react-admin';

const loginUri = `${process.env.API_URL}/authenticate`;

const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    const request = new Request(`${loginUri}`, {
      method: 'POST',
      body: JSON.stringify({ email: username, password: password }),
      credentials: 'include',
      headers: new Headers({ 'Content-Type': 'application/json' })
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        localStorage.setItem('auth', true);
        return response.body;
      })
      .catch(() => {
        throw new Error('Network error')
      });
  },
  logout: () => {
    localStorage.removeItem('auth');
    return Promise.resolve();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth');
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem('auth') ? Promise.resolve() : Promise.reject(),
  getPermissions: () => Promise.reject('Unknown method'),
  getIdentity: () => {
    try {
      const { first_name, last_name } = JSON.parse(localStorage.getItem('auth'));
      return Promise.resolve({ first_name, last_name });
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default authProvider;
