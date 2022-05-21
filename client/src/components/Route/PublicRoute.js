import { useSelector } from "react-redux";
import { getUser } from "../../redux/user/user.selectors";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const user = useSelector(getUser);
  return user ? <Navigate to="/"/> : <Outlet />;
};

export default PublicRoute;
