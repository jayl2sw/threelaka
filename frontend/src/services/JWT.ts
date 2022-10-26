export const saveToken = async(token:string) => {
  window.localStorage.setItem('accessToken', token);
  return
};
export const saveRefreshToken = async(token:string) => {
  window.localStorage.setItem('refreshToken', token);
  return 
};
export const getToken = () => {
  return window.localStorage.getItem('accessToken');
};
export const getRefreshToken = () => {
  return window.localStorage.getItem('refreshToken');
};
export const deleteToken = () => {
  return window.localStorage.removeItem('accessToken');
};
export const deleteRefreshToken = () => {
  return window.localStorage.removeItem('refreshToken');
};
