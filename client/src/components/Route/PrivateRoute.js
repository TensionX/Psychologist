import { useSelector } from "react-redux";
import { getUser } from "../../redux/user/user.selectors";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = useSelector(getUser);
  return user ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
