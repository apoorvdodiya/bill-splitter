import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { THEME } from "../../constants/css";
import { whileSpaceValidatory } from "../../constants/index";
import { IRootState } from "../../interfaces/api";
import { forgotPassword } from "../../redux/actions/auth";
import { useFormik } from "formik";
import { ErrorMessage } from "../../components/error/error-message";
import { InLineLoader } from "../../components/loader/inline-loader";
import * as Yup from "yup";
import { IUser } from "../../interfaces/user";

export const ForgotPassword = () => {
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

  const forgotPasswordForm = useFormik({
    initialValues: {
      userName: "",
    },
    onSubmit: (value) => {
      value.userName = value?.userName?.trim();
      (dispatch(forgotPassword(value as IUser)) as any)
        ?.then((res: any) => {
          navigate("/reset-password", { replace: true });
        })
        ?.catch((err: any) => {
          setErrorMEssage("User does not exist!");
        });
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string()
        .required("Please enter username")
        .test(whileSpaceValidatory("User name")),
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
        onSubmit={forgotPasswordForm.handleSubmit}
      >
        <div className="flex flex-col align-middle">
          <div className="w-fit">
            <input
              className={`${THEME.transparentControl}`}
              type="text"
              name="userName"
              id="iUsername"
              placeholder="User name"
              onChange={forgotPasswordForm.handleChange}
              onBlur={forgotPasswordForm.handleBlur}
              value={forgotPasswordForm.values.userName}
            />
          </div>
          <ErrorMessage form={forgotPasswordForm} control={"userName"} />
          <button type="submit" className={`${THEME.btnPrimarySquarish}`}>
            <InLineLoader show={isLoading} />
            Reset Password
          </button>
          <div className="flex text-sm mt-2">
            <ErrorMessage error={errorMessage} />
          </div>
        </div>
      </form>
    </div>
  );
};
