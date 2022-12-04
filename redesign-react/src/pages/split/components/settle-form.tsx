import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ErrorMessage } from "../../../components/error/error-message";
import { Modal } from "../../../components/modal/modal";
import { THEME } from "../../../constants/css";
import { settle } from "../../../redux/actions/split";

export const SettleForm = (props: any) => {
  const dispatch = useDispatch();
  const settleForm = useFormik({
    initialValues: {
      amount: props.amount,
      borrowerId: props.borrowerId,
    },
    onSubmit: (value) => {
      const { split, splitter, type } = props?.meta || {};
      (
        dispatch(
          settle(
            splitter?.id,
            {
              amount: value.amount,
              borrowerId: splitter?.user?.id,
            },
            type === "settle" ? "borrower" : "payee"
          )
        ) as any
      )
        .then((res: any) => {
          props.onModalClose();
          console.log(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
    },
  });

  return (
    <>
      {props.show && (
        <Modal
          header={props?.meta?.type === "deposit" ? "Deposit" : "Settle"}
          show={props.show}
          onModalClose={props.onModalClose}
          onModalSubmit={settleForm.handleSubmit}
        >
          <form
            onSubmit={settleForm.handleSubmit}
            className="flex flex-col align-middle"
          >
            <div className="w-full text-center">
              <input
                className={`${THEME.transparentControl} w-1/3 text-center`}
                type="number"
                name="amount"
                id="iAmount"
                placeholder="0"
                onChange={settleForm.handleChange}
                value={settleForm.values.amount}
                autoFocus  
              />
            </div>
            <ErrorMessage form={settleForm} control={"amount"} />
            <div className="text-center">
              {props?.meta?.type === "deposit" ? (
                <>
                  Collecting <i className="fa fa-rupee-sign fa-sm" />{" "}
                  {settleForm.values.amount || 0} from{" "}
                  {props?.meta?.splitter?.user?.firstName}{" "}
                  {props?.meta?.splitter?.user?.lastName}
                </>
              ) : (
                <>
                  Paying <i className="fa fa-rupee-sign fa-sm" />{" "}
                  {settleForm.values.amount || 0} to{" "}
                  {props?.meta.split?.createdBy?.firstName}{" "}
                  {props?.meta.split?.createdBy?.lastName}
                </>
              )}
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
