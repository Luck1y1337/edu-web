export const setItem = (token: string) => {
  return localStorage.setItem("token", token);
};

export const getItem = () => {
  return localStorage.getItem("token");
};
