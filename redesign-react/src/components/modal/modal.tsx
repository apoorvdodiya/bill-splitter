import { useState } from "react";
import { useSelector } from "react-redux";
import { THEME } from "../../constants/css";
import { IRootState } from "../../interfaces/api";
import { InLineLoader } from "../loader/inline-loader";

export const Modal = (props: any) => {
  const isLoading = useSelector<IRootState, boolean>((s) => s?.api?.isLoading);
  return (
    <>
      {props.show && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="items-middle justify-center min-h-screen pt-4 px-4 pb-20 text-center block sm:p-0 backdrop-filter backdrop-blur-sm">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div
                className={`absolute inset-0 opacity-25 bg-black dark:bg-white`}
              />
            </div>

            <span
              className="inline-block align-middle h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className={`
              inline-block rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8
              align-middle
              w-full sm:max-w-xl xl:max-w-3xl sm:w-full ${THEME.bgPrimary}`}
            >
              <div className="flex flex-row justify-between items-center p-4">
                <h3>{props.header || "Modal header"}</h3>
                <div
                  className="cursor-pointer"
                  onClick={() => props.onModalClose(!props.show)}
                >
                  <i className="fa fa-times"></i>
                </div>
              </div>
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {props.children || "Modal content"}
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className={THEME.btnPrimarySquarish}
                  onClick={() => props.onModalSubmit()}
                >
                  <InLineLoader show={isLoading} />
                  {props.submitText || "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {props.childModal}
    </>
  );
};
