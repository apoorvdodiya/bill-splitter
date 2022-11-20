import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../interfaces/api";
import { IUser } from "../interfaces/user";

export const Groups = () => {
  const user = useSelector<IRootState, IUser>((s) => s.auth.user);
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <div className="container mx-auto px-4 py-3">
      <div className="flex justify-between items-center text-2xl">
        <div className="flex">My Groups</div>
        <div className="flex items-center">
          <button className="">
            <i className="fa fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
