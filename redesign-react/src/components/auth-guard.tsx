import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { IRootState } from "../interfaces/api"
import { IProps } from "../interfaces/common";

export const AuthGuard = ({ children }: IProps) => {
  const isLoggedIn = useSelector<IRootState>(s => s?.auth?.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate replace={true} to="/login" />
  }
  return <>{children}</>;
}