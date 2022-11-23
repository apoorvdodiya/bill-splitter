import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../components/modal/modal";
import { THEME } from "../../constants/css";
import { IRootState } from "../../interfaces/api";
import { IGroup } from "../../interfaces/group";
import { IUser } from "../../interfaces/user";
import { getGroupList } from "../../redux/actions/group";
import { AddGroup } from "./components/add-group";

export const Groups = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector<IRootState, boolean>((s) => s.auth.isLoggedIn);
  const groups = useSelector<IRootState, IGroup[]>((s) => s.group.userGroups);
  const [collapsed, setCollapsed] = useState<number | undefined>(0);
  const [groupModal, setGroupModal] = useState<boolean>(false);

  useEffect(() => {
    !groupModal && getUserGroups();
  }, [groupModal]);

  useEffect(() => {
    console.log("groups", groups);
  }, [groups]);

  const collapseGroup = (group: IGroup) => {
    group.collapsed = !group.collapsed;
  };

  const getUserGroups = () => {
    dispatch(getGroupList());
  };
  return (
    <div className="container mx-auto px-4 py-3">
      <AddGroup show={groupModal} onModalClose={setGroupModal}></AddGroup>
      <div className="flex justify-between items-center text-2xl">
        <div className="flex">My Groups</div>
        <div className="flex items-center">
          <button className="" onClick={() => setGroupModal(true)}>
            <i className="fa fa-plus"></i>
          </button>
        </div>
      </div>
      <div className="flex flex-col my-3">
        {groups?.length ? (
          groups.map((group) => {
            return (
              <div
                className={`card p-3 rounded-lg ${THEME.bgSecondary} ${THEME.borderDarkerColor}`}
                key={group.id}
              >
                <div className={`flex justify-between`}>
                  <div>{group.name}</div>
                  <div>
                    {group.collapsed}
                    <span
                      onClick={() =>
                        setCollapsed(
                          (group.id == collapsed ? 0 : group.id) || 0
                        )
                      }
                    >
                      <i
                        className={`fas fa-chevron-${
                          group.id !== collapsed ? "down" : "up"
                        } fa-xl`}
                      ></i>
                    </span>
                    {/* <span className="mx-2">{group.members?.length}</span>
                    <i className="fa fa-user"></i> */}
                  </div>
                </div>
                {group.id !== collapsed ? (
                  <></>
                ) : (
                  <div className="max-h-24 scroll-auto overflow-auto">
                    {group.members?.map((member) => {
                      return (
                        <div className="text-sm">
                          {member?.firstName} {member.lastName}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
