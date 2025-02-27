import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  rolePage: string[] | undefined;
};

const ProtectedRoute = ({ children, rolePage }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();

  let user;

  if (token) {
    user = verifyToken(token) as TUser;
  }

  if (rolePage !== undefined && !rolePage.includes(user?.role as string)) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
