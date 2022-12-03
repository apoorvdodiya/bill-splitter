import { useFormik } from "formik";
import { Modal } from "../../../components/modal/modal";
import { COMPONENT, THEME } from "../../../constants/css";
import * as Yup from "yup";
import Select from "react-select";
import { ErrorMessage } from "../../../components/error/error-message";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addGroup, getUserList } from "../../../redux/actions/group";
import { IRootState } from "../../../interfaces/api";
import { IUser } from "../../../interfaces/user";
import {
  minArrayLengthValidatory,
  whileSpaceValidatory,
} from "../../../constants";
import { IGroup } from "../../../interfaces/group";
import { ISplitterPayload } from "../../../interfaces/split";
import { addSplit, getGroupList } from "../../../redux/actions/split";

export const AddSplit = (props: any) => {
  const [totalRation, setTotalRation] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  const groupList = useSelector<IRootState, IGroup[]>(
    (s) => s.split.userGroups
  );
  const user = useSelector<IRootState, IUser>((s) => s.auth.user);
  useEffect(() => {
    console.log(totalRation, totalAmount);
    if (totalAmount) recalculateSplit(totalAmount);
  }, [totalRation, totalAmount]);

  useEffect(() => {
    console.log("props.show changed to ", props.show, groupList);
    console.log(user.id);

    props.show && dispatch(getGroupList());
  }, [props.show]);

  useEffect(() => {
    console.log("123", groupList);
  }, [groupList]);

  const splitForm = useFormik({
    initialValues: {
      title: "",
      description: "",
      selectedGroup: null as any,
      splitters: [] as any[],
      type: "group",
      totalAmount: 0,
    },
    onSubmit: (value) => {
      console.log("submitting", value);
      (dispatch(addSplit(value)) as any)
        .then((res: any) => {
          props.onModalClose();
          console.log(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Please enter title")
        .test(whileSpaceValidatory("Title")),
      selectedGroup: Yup.string().required("Please select group"),
      totalAmount: Yup.string()
        .required("Please enter total amount")
        .test(whileSpaceValidatory("Total amount")),
    }),
  });

  const setGroup = async (groupId: number) => {
    // await splitForm.setFieldValue(
    //   "selectedGroup",
    //   value?.value || 0
    // );
    const { totalAmount } = splitForm.values;
    console.log("group id", groupId);

    if (groupId) {
      const group = groupList.find((g) => g.id === groupId);
      if (group) {
        const splitters: ISplitterPayload[] =
          group?.members?.map(
            (m) =>
              ({
                groupId: group.id,
                ration: 1,
                member: m,
                userId: m.id,
                amount:
                  totalAmount && group?.members?.length
                    ? totalAmount / group?.members?.length
                    : 0,
              } as ISplitterPayload)
          ) || [];
        setTotalRation(group.members?.length || 0);
        console.log("initial ratio", totalRation);

        await splitForm.setValues({
          ...splitForm.values,
          selectedGroup: groupId,
          splitters,
        });
      }
    }
  };

  const onRation = async (type: "minus" | "plus", index: number) => {
    let { splitters } = splitForm.values;
    const findSplitter = splitters.at(index);
    if (findSplitter.ration === 1 && type === "minus") {
      return;
    }
    if (findSplitter) {
      switch (type) {
        case "minus":
          setTotalRation(totalRation - 1);
          findSplitter.ration--;
          break;
        case "plus":
          setTotalRation(totalRation + 1);
          findSplitter.ration++;
          break;
      }
      splitters[index] = findSplitter;
      // await splitForm.setFieldValue("splitters", splitters);
      console.log(totalRation);
    }
  };

  const recalculateSplit = async (totalAmount: number) => {
    console.log(" totalRation ", totalRation);
    const value = splitForm.values;
    console.log(" value.splitters ", value.splitters);
    const rationAmount = totalAmount / totalRation;
    console.log(rationAmount);
    if (value.splitters.length) {
      const splitters = value.splitters.map((s) => ({
        ...s,
        amount: s.ration * rationAmount,
      }));
      await splitForm.setValues({
        ...value,
        totalAmount,
        splitters,
      });
    } else {
      await splitForm.setFieldValue("totalAmount", totalAmount);
    }
  };

  return (
    <>
      {props.show && (
        <Modal
          header="Add Split"
          show={props.show}
          onModalClose={props.onModalClose}
          onModalSubmit={splitForm.handleSubmit}
        >
          <form
            onSubmit={splitForm.handleSubmit}
            className="flex flex-col align-middle"
          >
            <div className="w-full">
              <input
                className={`${THEME.transparentControl} w-full`}
                type="text"
                name="title"
                id="iTitle"
                placeholder="Title"
                onChange={splitForm.handleChange}
                value={splitForm.values.title}
              />
            </div>
            <ErrorMessage error={splitForm.errors.title} />
            <div className="w-full">
              <Select
                className="w-full"
                // TODO FIX THIS
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "rgb(203 213 225 / var(--tw-text-opacity))", // accent - shadow
                    primary25: "rgb(71 85 105 / var(--tw-bg-opacity))",
                  },
                })}
                placeholder="Select group"
                styles={COMPONENT.reactSelect}
                onChange={async (value) => {
                  await setGroup(value?.value || 0);
                }}
                // value={groupForm.values.members}
                name="selectedGroup"
                isSearchable={true}
                autoFocus={true}
                options={
                  groupList && groupList.length
                    ? groupList.map((g) => ({
                        value: g.id,
                        label: g.name,
                      }))
                    : []
                }
              />
            </div>
            <ErrorMessage error={splitForm.errors.selectedGroup} />
            <div className="w-full">
              <input
                className={`${THEME.transparentControl} w-full`}
                type="number"
                name="totalAmount"
                id="iTotalAmount"
                placeholder="Amount"
                onChange={(e) => setTotalAmount(+e.target.value)}
                value={splitForm.values.totalAmount}
              />
            </div>
            <ErrorMessage error={splitForm.errors.totalAmount} />
            <div className="w-full">
              <input
                className={`${THEME.transparentControl} w-full`}
                type="text"
                name="description"
                id="iDescription"
                placeholder="Description"
                onChange={splitForm.handleChange}
                value={splitForm.values.description}
              />
            </div>
            <ErrorMessage error={splitForm.errors.description} />
            {splitForm?.values?.splitters?.length ? (
              <table className="table table-auto w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th className="text-center">Ratio</th>
                    <th className="text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {splitForm.values.splitters.map(
                    (splitter: ISplitterPayload, i: number) => (
                      <tr className="text-base" key={splitter.userId}>
                        <td>
                          {splitter.member?.firstName}{" "}
                          {splitter.member?.lastName}
                        </td>
                        <td className="text-center">
                          <span>
                            <button
                              type="button"
                              className={""}
                              onClick={(e) => onRation("minus", i)}
                            >
                              <i className="fa fa-minus"></i>
                            </button>
                            <span className="mx-2">{splitter.ration}</span>
                            <button
                              type="button"
                              className={""}
                              onClick={(e) => onRation("plus", i)}
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </span>
                        </td>
                        <td className="text-right">
                          <i className="fa fa-rupee-sign"></i>{" "}
                          {splitter.amount?.toFixed(2)}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            ) : (
              <></>
            )}
          </form>
        </Modal>
      )}
    </>
  );
};
