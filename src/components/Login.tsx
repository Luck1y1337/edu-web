import { useEffect } from "react";
import useUserStore from "../store/user.store";

const Login = () => {
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    setTimeout(() => {
      setUser({ name: "Jasurbek", email: "jasurbek@gmail.com" });
    }, 8000);
  }, [setUser]);
  console.log("Login render");
  return <div>Login</div>;
};
export default Login;
