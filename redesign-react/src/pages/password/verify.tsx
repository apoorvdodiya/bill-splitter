import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { THEME } from "../../constants/css";
import { whileSpaceValidatory } from "../../constants/index";
import { IResetPassword, IRootState } from "../../interfaces/api";
import { resetPassword, verifyAccount } from "../../redux/actions/auth";
import { useFormik } from "formik";
import { ErrorMessage } from "../../components/error/error-message";
import { InLineLoader } from "../../components/loader/inline-loader";
import * as Yup from "yup";
import { IUser } from "../../interfaces/user";

export const Verify = () => {
  const isLoggedIn = useSelector<IRootState, boolean>(
    (s) => s?.auth?.isLoggedIn
  );
  const isLoading = useSelector<IRootState, boolean>((s) => s?.api?.isLoading);
  const navigate = useNavigate();
  const [errorMessage, setErrorMEssage] = useState("");
  useEffect(() => {
    console.log('==========',isLoggedIn)
    if (isLoggedIn) {
      navigate("/groups", { replace: true });
    }
  }, [isLoggedIn]);

  const dispatch = useDispatch();

  const verifyForm = useFormik({
    initialValues: {
      userName: "",
      code: "",
    },
    onSubmit: (value) => {
      value.userName = value?.userName?.trim();
      (dispatch(verifyAccount(value as IResetPassword)) as any)
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
        .required("Please verification code")
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
        onSubmit={verifyForm.handleSubmit}
      >
        <div className="flex flex-col align-middle">
          <div className="w-fit">
            <input
              className={`${THEME.transparentControl}`}
              type="text"
              name="userName"
              id="iUsername"
              placeholder="User name"
              onChange={verifyForm.handleChange}
              onBlur={verifyForm.handleBlur}
              value={verifyForm.values.userName}
            />
          </div>
          <ErrorMessage form={verifyForm} control={"userName"} />
          <div className="w-fit">
            <input
              className={`${THEME.transparentControl}`}
              type="text"
              name="code"
              id="iCode"
              placeholder="Verification code"
              onChange={verifyForm.handleChange}
              onBlur={verifyForm.handleBlur}
              value={verifyForm.values.code}
            />
          </div>
          <ErrorMessage form={verifyForm} control={"code"} />
          <button type="submit" className={`${THEME.btnPrimarySquarish}`}>
            <InLineLoader show={isLoading} />
            Verify Account
          </button>
          <div className="flex text-sm mt-2">
            <ErrorMessage error={errorMessage} />
          </div>
        </div>
      </form>
    </div>
  );
};
