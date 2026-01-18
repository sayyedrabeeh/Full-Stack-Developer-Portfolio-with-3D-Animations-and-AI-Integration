import { useNavigate } from "react-router-dom";
 import { useEffect } from "react";
import { isAuthenticated } from "./auth";

const PrivateRoute = ({ children }) => {

    const navigate = useNavigate()

 const isAuth = isAuthenticated();

useEffect(() => {
  if (!isAuth) navigate("/login", { replace: true });
}, [isAuth, navigate]);

return isAuth ? children : null;


   
}
export default PrivateRoute