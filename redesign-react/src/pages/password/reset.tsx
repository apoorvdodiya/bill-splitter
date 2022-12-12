import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { THEME } from "../../constants/css";
import { whileSpaceValidatory } from "../../constants/index";
import { IResetPassword, IRootState } from "../../interfaces/api";
import { resetPassword } from "../../redux/actions/auth";
import { useFormik } from "formik";
import { ErrorMessage } from "../../components/error/error-message";
import { InLineLoader } from "../../components/loader/inline-loader";
import * as Yup from "yup";
import { IUser } from "../../interfaces/user";

export const ResetPassword = () => {
  const isLoggedIn = useSelector<IRootState, boolean>(
    (s) => s?.auth?.isLoggedIn
  );
  const isLoading = useSelector<IRootState, boolean>((s) => s?.api?.isLoading);
  const navigate = useNavigate();
  const [errorMessage, setErrorMEssage] = useState("");
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/groups", { replace: true });
    }
  }, [isLoggedIn]);

  const dispatch = useDispatch();

  const resetPasswordForm = useFormik({
    initialValues: {
      userName: "",
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: (value) => {
      value.userName = value?.userName?.trim();
      value.confirmPassword = value?.confirmPassword?.trim();
      value.newPassword = value?.newPassword?.trim();
      (dispatch(resetPassword(value as IResetPassword)) as any)
        ?.then((res: any) => {
          navigate("/login", { replace: true });
        })
        ?.catch((err: any) => {
          setErrorMEssage("Invalid details provided!");
        });
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string()
        .required("Please enter username")
        .test(whileSpaceValidatory("User name")),
      code: Yup.string()
        .required("Please enter password")
        .test(whileSpaceValidatory("Password")),
      newPassword: Yup.string()
        .required("Please enter password")
        .test(whileSpaceValidatory("Password")),
      confirmPassword: Yup.string()
        .required("Please enter password")
        .test(whileSpaceValidatory("Password")),
    }),
  });

  return (
    <div className={`flex flex-col align-middle h-screen p-5 justify-center`}>
      <div className="flex flex-row justify-center">
        <div className={`border-2 rounded-full p-6 px-9 ${THEME.borderColor}`}>
          <i className="fa fa-bolt fa-4x"></i>
        </div>
      </div>
      <div className="flex justify-center text-3xl mt-5 mb-3">My Cut</div>
      <form
        onChange={() => setErrorMEssage("")}
        className="flex flex-row justify-center"
        onSubmit={resetPasswordForm.handleSubmit}
      >
        <div className="flex flex-col align-middle">
          <div className="w-fit">
            <input
              className={`${THEME.transparentControl}`}
              type="text"
              name="userName"
              id="iUsername"
              placeholder="User name"
              onChange={resetPasswordForm.handleChange}
              onBlur={resetPasswordForm.handleBlur}
              value={resetPasswordForm.values.userName}
            />
          </div>
          <ErrorMessage form={resetPasswordForm} control={"userName"} />
          <div className="w-fit">
            <input
              className={`${THEME.transparentControl}`}
              type="text"
              name="code"
              id="iCode"
              placeholder="Reset code"
              onChange={resetPasswordForm.handleChange}
              onBlur={resetPasswordForm.handleBlur}
              value={resetPasswordForm.values.code}
            />
          </div>
          <ErrorMessage form={resetPasswordForm} control={"code"} />
          <div className="w-fit">
            <input
              className={`${THEME.transparentControl}`}
              type="password"
              name="newPassword"
              id="iNewPassword"
              placeholder="New Password"
              onChange={resetPasswordForm.handleChange}
              onBlur={resetPasswordForm.handleBlur}
              value={resetPasswordForm.values.newPassword}
            />
          </div>
          <ErrorMessage form={resetPasswordForm} control={"newPassword"} />
          <div className="w-fit">
            <input
              className={`${THEME.transparentControl}`}
              type="password"
              name="confirmPassword"
              id="iConfirmPassword"
              placeholder="Confirm Password"
              onChange={resetPasswordForm.handleChange}
              onBlur={resetPasswordForm.handleBlur}
              value={resetPasswordForm.values.confirmPassword}
            />
          </div>
          <ErrorMessage form={resetPasswordForm} control={"confirmPassword"} />
          <button type="submit" className={`${THEME.btnPrimarySquarish}`}>
            <InLineLoader show={isLoading} />
            Save New Password
          </button>
          <div className="flex text-sm mt-2">
            <ErrorMessage error={errorMessage} />
          </div>
        </div>
      </form>
    </div>
  );
};
