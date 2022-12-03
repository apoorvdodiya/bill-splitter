import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { THEME } from "../../constants/css";
import { IRootState } from "../../interfaces/api";
import { ISplit } from "../../interfaces/split";
import { getSplitList } from "../../redux/actions/split";
import { AddSplit } from "./components/add-split";
// import { AddSplit } from "./components/add-split";

export const Splits = () => {
  const dispatch = useDispatch();
  const splits = useSelector<IRootState, ISplit[]>((s) => s.split.userSplits);
  const [collapsed, setCollapsed] = useState<number | undefined>(0);
  const [splitModal, setSplitModal] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("paid");

  useEffect(() => {
    !splitModal && getUserSplits();
  }, [splitModal, tab]);

  const getSplitCardByTab = () => {};

  const getUserSplits = () => {
    dispatch(getSplitList(tab));
  };
  return (
    <div className="container mx-auto px-4">
      <AddSplit show={splitModal} onModalClose={setSplitModal}></AddSplit>
      <div
        className={`flex justify-between items-center text-2xl sticky top-0 py-3 ${THEME.bgPrimary}`}
      >
        <div className="flex">My Activity</div>
        <div className="flex items-center">
          <select
            className={`${THEME.transparentControl} mx-2 border-0 text-base`}
            name="tabSelector"
            id="iTabSelector"
            onChange={(e) => setTab(e.target.value)}
          >
            <option value="paid" selected>
              Paid
            </option>
            <option value="owed">Owed</option>
            <option value="settled">Settled</option>
          </select>
          <button className="" onClick={() => setSplitModal(true)}>
            <i className="fa fa-plus"></i>
          </button>
        </div>
      </div>
      <div className="flex flex-col mb-3">
        {splits?.length ? (
          splits.map((split) => {
            switch (tab) {
              case "paid":
              case "settled":
                return (
                  <div
                    className={`card p-3 rounded-lg ${THEME.bgSecondary} ${THEME.borderDarkerColor}`}
                    key={split.id}
                  >
                    <div className={`flex justify-between`}>
                      <div>{split.title}</div>
                      <div>
                        {split.collapsed}
                        <button
                          type="button"
                          onClick={() =>
                            setCollapsed(
                              (split.id == collapsed ? 0 : split.id) || 0
                            )
                          }
                        >
                          <span className="mx-2">
                            <i className="fa fa-rupee-sign"></i>{" "}
                            {split.totalAmount}
                          </span>
                          <i
                            className={`fas fa-chevron-${
                              split.id !== collapsed ? "down" : "up"
                            } fa-xl`}
                          ></i>
                        </button>
                      </div>
                    </div>
                    {split.id !== collapsed ? (
                      <></>
                    ) : (
                      <table
                        border={1}
                        className="table-auto w-full max-h-24 scroll-auto overflow-auto"
                      >
                        <tbody>
                          {split.splitters?.map((splitter) => {
                            return (
                              <tr
                                className="flex justify-between text-sm"
                                key={splitter.id}
                              >
                                <td className="w-1/4">
                                  {splitter?.user?.firstName}{" "}
                                  {splitter?.user?.lastName}
                                </td>
                                <td className="">
                                  <i className="fa fa-rupee-sign"></i>{" "}
                                  {splitter.amount
                                    ? splitter.paidAmount
                                      ? splitter.amount - splitter.paidAmount
                                      : splitter.amount
                                    : 0}
                                </td>
                                <td className="">
                                  {tab === "settled" ? (
                                    <span className="italic">SETTLED</span>
                                  ) : (
                                    <button className="bold">DEPOSIT</button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                );
              case "owed":
                return (
                  <div
                    className={`card p-3 rounded-lg ${THEME.bgSecondary} ${THEME.borderDarkerColor}`}
                    key={split.id}
                  >
                    <div className={`flex justify-between`}>
                      <div>{split.title}</div>
                      <div>
                        {split.collapsed}
                        <button
                          type="button"
                          onClick={() =>
                            setCollapsed(
                              (split.id == collapsed ? 0 : split.id) || 0
                            )
                          }
                        >
                          <span className="">
                            <i className="fa fa-rupee-sign"></i>{" "}
                            {split?.splitters &&
                              split?.splitters[0] &&
                              split.splitters[0].amount}
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className={`flex justify-between text-sm`}>
                      <div>
                        Created by {split.createdBy?.firstName}{" "}
                        {split.createdBy?.lastName}
                      </div>
                      <div>
                        {/* TODO */}
                        {split.collapsed}
                        <button>SETTLE</button>
                      </div>
                    </div>
                  </div>
                );
              default:
                return <></>;
            }
          })
        ) : (
          <>
            <div className="italic p-4">No data found</div>
          </>
        )}
      </div>
    </div>
  );
};
