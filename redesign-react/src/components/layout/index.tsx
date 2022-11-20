import { Outlet } from "react-router-dom";
import { THEME } from "../../constants/css";
import { IProps } from "../../interfaces/common";
import { Footer } from "./footer";
import { Header } from "./header";

export const Layout = ({ children }: IProps) => {
  return (
    <>
      <div className="h-screen">
        <div className={`${THEME.bgSecondary}`} style={{ height: THEME.headerHeight }}>
          <Header />
        </div>
        <div
          style={{
            height: `calc(100% - ${THEME.footerHeight} - ${THEME.headerHeight})`,
          }}
        >
          <Outlet />
        </div>
        <div className={`${THEME.bgSecondary}`} style={{ height: THEME.footerHeight }}>
          <Footer />
        </div>
      </div>
    </>
  );
};
