import { useEffect } from "react";
import useUserStore from "../store/user.store";

const Login = () => {
  const store = useUserStore();
  useEffect(() => {
    setTimeout(() => {
      store.setUser({ name: "Jasurbek", email: "jasurbek@gmail.com" });
    }, 8000);
  }, []);
  console.log("Login render");
  return <div>Login</div>;
};
export default Login;
