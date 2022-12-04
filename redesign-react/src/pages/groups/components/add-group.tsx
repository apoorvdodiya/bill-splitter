import { useFormik } from "formik";
import { Modal } from "../../../components/modal/modal";
import { COMPONENT, THEME } from "../../../constants/css";
import * as Yup from "yup";
import Select from "react-select";
import { ErrorMessage } from "../../../components/error/error-message";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addGroup, getUserList } from "../../../redux/actions/group";
import { IRootState } from "../../../interfaces/api";
import { IUser } from "../../../interfaces/user";
import {
  minArrayLengthValidatory,
  whileSpaceValidatory,
} from "../../../constants";
export const AddGroup = (props: any) => {
  const dispatch = useDispatch();
  const userList = useSelector<IRootState, IUser[]>((s) => s.group.userList);

  useEffect(() => {
    console.log("props.show changed to ", props.show, userList);

    props.show && dispatch(getUserList());
  }, [props.show]);

  const groupForm = useFormik({
    initialValues: {
      name: "",
      members: [] as any,
    },
    onSubmit: (value) => {
      console.log("submitting", value);
      (dispatch(addGroup(value)) as any)
        .then((res: any) => {
          props.onModalClose();
          console.log(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Please enter group name")
        .test(whileSpaceValidatory("Group name")),
      members: Yup.array().test(minArrayLengthValidatory(1, "member")),
    }),
  });

  return (
    <>
      {props.show && (
        <Modal
          header="Add Group"
          show={props.show}
          onModalClose={props.onModalClose}
          onModalSubmit={groupForm.handleSubmit}
        >
          <form
            onSubmit={groupForm.handleSubmit}
            className="flex flex-col align-middle"
          >
            <div className="w-full">
              <input
                className={`${THEME.transparentControl} w-full`}
                type="text"
                name="name"
                id="iName"
                placeholder="Group name"
                onChange={groupForm.handleChange}
                onBlur={groupForm.handleBlur}
                value={groupForm.values.name}
              />
            </div>
            <ErrorMessage form={groupForm} control="name" />
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
                placeholder="Select members"
                styles={COMPONENT.reactSelect}
                onBlur={groupForm.handleBlur}
                onChange={(value) => {
                  groupForm.setValues({
                    ...groupForm.values,
                    members: value.map((v) => v.value),
                  });
                }}
                // value={groupForm.values.members}
                name="members"
                isMulti={true}
                isSearchable={true}
                autoFocus={true}
                options={
                  userList && userList.length
                    ? userList.map((u) => ({
                        value: u.id,
                        label: `${u.firstName} ${u.lastName}`,
                      }))
                    : []
                }
              />
            </div>
            <ErrorMessage form={groupForm} control="members" />
          </form>
        </Modal>
      )}
    </>
  );
};
