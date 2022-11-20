import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { THEME } from "../constants/css";
import { whileSpaceValidatory } from "../constants/index";
import { IRootState } from "../interfaces/api";
import { doLogin, dummyLogin } from "../redux/actions/auth";
import { useFormik } from "formik";
import { ErrorMessage } from "../components/error/error-message";
import { InLineLoader } from "../components/loader/inline-loader";
import * as Yup from "yup";

export const Login = () => {
  const isLoggedIn = useSelector<IRootState, boolean>(
    (s) => s?.auth?.isLoggedIn
  );
  const isLoading = useSelector<IRootState, boolean>((s) => s?.api?.isLoading);
  const navigate = useNavigate();
  const [errorMessage, setErrorMEssage] = useState("");
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home", { replace: true });
    }
  }, [isLoggedIn]);

  const dispatch = useDispatch();

  const loginForm = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: (value) => {
      value.userName = value?.userName?.trim();
      value.password = value?.password?.trim();
      (dispatch(doLogin(value)) as any)?.catch((err: any) => {
        setErrorMEssage("Invalid login credentials!");
      });
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string()
        .required("Please enter username")
        .test(whileSpaceValidatory("User name")),
      password: Yup.string()
        .required("Please enter password")
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
        onSubmit={loginForm.handleSubmit}
      >
        <div className="flex flex-col align-middle">
          <div className="w-fit">
            <input
              className={`${THEME.transparentControl}`}
              type="text"
              name="userName"
              id="iUsername"
              placeholder="User name"
              onChange={loginForm.handleChange}
              value={loginForm.values.userName}
            />
          </div>
          <ErrorMessage error={loginForm.errors.userName} />
          <div>
            <input
              className={`${THEME.transparentControl}`}
              type="password"
              name="password"
              id="iPassword"
              placeholder="Password"
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
            />
          </div>
          <ErrorMessage error={loginForm.errors.password} />
          <button type="submit" className={`${THEME.btnPrimary}`}>
            <InLineLoader show={isLoading} />
            Login
          </button>
          <ErrorMessage error={errorMessage} />
        </div>
      </form>
    </div>
  );
};
