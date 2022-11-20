import { useDispatch } from "react-redux";
import { THEME } from "../../constants/css";
import { logout } from "../../redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row p-3 items-center justify-between shadow-sm">
      <div className="flex x-row items-center">
        {/* <div className={`border rounded-full p-1 px-3 ${THEME.borderColor}`}>
            <i className="fa fa-bolt fa-s"></i>
          </div> */}
        {/* <span className="text-lg mx-2">My Cut</span> */}
        <div className={`border rounded-full p-1 px-3 ${THEME.borderColor}`}>
          <i className="fa fa-user fa-sm"></i>
        </div>
        <span className="text-lg mx-2">Hi, Alex!</span>
      </div>
      <div className="flex x-row items-center">
        <div className={`rounded-full p-1 px-3 mr-2`} onClick={() => {}}>
          <i className="fa fa-sun"></i>
        </div>
        <div className={`border rounded-full p-1 px-3 ${THEME.borderColor}`}>
          <i className="fa fa-arrow-right fa-sm"></i>
        </div>
      </div>
    </div>
  );
};
