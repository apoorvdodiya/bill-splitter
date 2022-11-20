import { useSelector } from "react-redux"
import { IRootState } from "../../interfaces/api";
import { IProps } from "../../interfaces/common";

export const Loader = ({ children }: IProps) => {
  const isLoading = useSelector<IRootState, boolean>(s => s?.api?.isLoading);

  return <>
    <div className="app-loader">
      Loading...
    </div>
    {children}
  </>
}