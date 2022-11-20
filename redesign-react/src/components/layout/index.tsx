import { Outlet } from "react-router-dom";
import { IProps } from "../../interfaces/common";
import { Footer } from "./footer";
import { Header } from "./header";

export const Layout = ({ children }: IProps) => {
  return <>
    <div><Header /></div>
    <div><Outlet /></div>
    <div><Footer /></div>
  </>
}