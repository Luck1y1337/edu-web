export const setItem = (token: string) => {
  return localStorage.setItem("token", token);
};

export const getItem = () => {
  return localStorage.getItem("token");
};

export const setRefreshToken = (token: string) => {
  return localStorage.setItem("refreshToken", token);
};

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken");
};

export const clearTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};
