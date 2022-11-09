import axios from 'axios';

const customAxios = axios.create({
  // baseURL: 'http://localhost:8000/',
  // nginx가 안달려있을 땐 port번호를 적어줘야 제대로감
  baseURL: 'https://3laka.com/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    // 'Access-Control-Allow-Origin': '*',
  },
});

// Interceptors
customAxios.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();

    if (config.headers && token)
      config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function getLocalAccessToken() {
  const accessToken = window.localStorage.getItem('accessToken');
  return accessToken;
}

function getLocalRefreshToken() {
  const refreshToken = window.localStorage.getItem('refreshToken');
  return refreshToken;
}

function refreshToken() {
  return customAxios.post('api/v1/user/auth/refresh', {
    refreshToken: getLocalRefreshToken(),
    accessToken: getLocalAccessToken(),
  });
}
// Add a response interceptor
customAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await refreshToken();

          const { accessToken } = rs.data;
          window.localStorage.setItem('accessToken', accessToken);

          //갱신된 토큰이 들어간상태로 바로 요청이 안감
          customAxios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;
          return customAxios(originalConfig);
        } catch (_error) {
          // 리프레쉬 토큰도 만료됐으니 재로그인하세요
          window.location.href = '/auth/login';

          // if (_error.response && _error.response.data) {
          //   return Promise.reject(_error.response.data);
          // }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);

export default customAxios;
